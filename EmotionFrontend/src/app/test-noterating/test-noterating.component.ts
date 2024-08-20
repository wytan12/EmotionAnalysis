import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TimeService } from '../services/time.service';
import { SharedTimeService } from '../shared-time.service';
import { TitleService } from '../title.service';
import { SharedViewService } from '../shared-view.service';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NoteVisibilityService } from '../note-visibility.service';

@Component({
  selector: 'app-test-noterating',
  templateUrl: './test-noterating.component.html',
  styleUrls: ['./test-noterating.component.css'], // corrected 'styleUrl' to 'styleUrls'
})
export class TestNoteratingComponent implements OnInit {
  title: string = '';
  datasetLabel: string = '';
  intensity: number | null = null;
  intensityKey: any;
  selectedTimeRange: [Date | null, Date | null] = [null, null];
  selectedView: string[] = [];
  Math: any = Math; // Assigning Math object to use in the template
  isVisible = true;
  isLoading = true; // Add loading state
  filteredEmoReadWrite: any[] = []; // Replaced EmoReadWrite[] with any[] since the structure isn't strictly defined in the code

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private timeService: TimeService,
    private sharedTimeService: SharedTimeService,
    private titleService: TitleService,
    private sharedViewService: SharedViewService,
    private visibilityService: NoteVisibilityService
  ) {}

  ngOnInit() {
    // Combine latest observables for title and dataset label
    this.visibilityService
      .getVisibilityObservable('EmotionNote')
      .subscribe((visible) => {
        this.isVisible = visible;
      });

    combineLatest([
      this.titleService.selectedTitle$,
      this.titleService.selectedLabel$,
      this.sharedTimeService.selectedTime$,
      this.sharedViewService.selectedView$,
    ])
      .pipe(
        switchMap(([title, datasetLabel, timeRange, view]) => {
          if (title && datasetLabel) {
            this.isLoading = true; // Start loading
            this.title = title;
            this.datasetLabel = datasetLabel;
            console.log('Title:', title);
            console.log('Dataset Label:', datasetLabel);
            this.intensityKey = `${title}_Intensity`;

            const from =
              timeRange && timeRange.length === 2
                ? new Date(timeRange[0])
                : undefined;
            const to =
              timeRange && timeRange.length === 2
                ? new Date(timeRange[1])
                : undefined;

            // Update to handle multiple selected views
            this.selectedView = Array.isArray(view) ? view : view ? [view] : [];
            console.log('Selected views:', this.selectedView);

            const viewsArray = typeof view === 'string' ? 
                           view.split(',').map(v => v.trim()) : 
                           Array.isArray(view) ? view : [];
            console.log('views array:', viewsArray);

            return this.getEmoReadWriteByEmotionTitle(
              title,
              datasetLabel,
              from,
              to,
              viewsArray
              // this.selectedView
            );
          } else {
            return of([]); // Return an observable of an empty array
          }
        })
      )
      .subscribe(
        (filteredData) => {
          this.filteredEmoReadWrite = filteredData;
          this.isLoading = false; // End loading
        },
        (error) => {
          console.error('Error fetching community data:', error);
          this.isLoading = false; // End loading
        }
      );
  }

  currentSectionNumber: number = 1;

  getEmoReadWriteByEmotionTitle(
    emotionTitle: string,
    emotionLabel: string,
    fromDate?: Date,
    toDate?: Date,
    views?: string[]
  ): Promise<any[]> {
    return new Promise<any[]>((resolve) => {
      this.http
        .get<any[]>('http://localhost:3000/api/community-data')
        .subscribe((dataList) => {
          const filteredList = dataList.filter((data) => {
            console.log(data);
            const action = data.actionType.toLowerCase();
            const isActionTypeMatch = action === emotionLabel.toLowerCase();

            const createdDate = new Date(data.created);
            const isWithinDateRange =
              (!fromDate || createdDate >= fromDate) &&
              (!toDate || createdDate <= toDate);

            const hasMatchingEmotion = data.ratings.some((rating: any) => {
              if (
                rating.emotionId
                  .toLowerCase()
                  .includes(emotionTitle.toLowerCase())
              ) {
                data.Intensity = data.Intensity || [];
                data.Intensity.push({
                  key: `${rating.emotionId}_Intensity`,
                  value: rating.intensity,
                });
                return true;
              }
              return false;
            });

            // Implement view filtering
            // const isInView =
            //   !views ||
            //   data.inViews.some((view: any) => views.includes(view.title));

            const title = data.inViews[0].title;
            const isInView = views == undefined || views.includes(data.inViews[0].title);
            console.log(title);
            console.log(`isInView result: ${isInView}`);

            return (
              isActionTypeMatch &&
              hasMatchingEmotion &&
              isWithinDateRange &&
              isInView
            );
          });

          resolve(filteredList);
          console.log(filteredList);
        });
    });
  }

  filterList(selectedValue: string): void {
    console.log(selectedValue);
    if (selectedValue === 'Intensity') {
      this.filteredEmoReadWrite.sort((a, b) => {
        const intensityA = a.Intensity[0]?.value || 0;
        const intensityB = b.Intensity[0]?.value || 0;
        return intensityB - intensityA;
      });
    } else {
      this.filteredEmoReadWrite.sort(
        (a, b) =>
          new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf()
      );
    }
  }

  closeEmotionNote(): void {
    this.visibilityService.setVisibility('EmotionNote', false);
  }
}
