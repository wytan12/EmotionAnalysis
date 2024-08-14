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
  styleUrls: ['./test-noterating.component.css'] // corrected 'styleUrl' to 'styleUrls'
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
    this.visibilityService.getVisibilityObservable('EmotionNote').subscribe(visible => {
      this.isVisible = visible;
    });

    combineLatest([
      this.titleService.selectedTitle$,
      this.titleService.selectedLabel$,
      this.sharedTimeService.selectedTime$,
      this.sharedViewService.selectedView$
    ]).pipe(
      switchMap(([title, datasetLabel, timeRange, view]) => {
        if (title && datasetLabel) {
          this.title = title;
          this.datasetLabel = datasetLabel;
          console.log('Title:', title);
          console.log('Dataset Label:', datasetLabel);
          this.intensityKey = `${title}_Intensity`;

          const from = timeRange && timeRange.length === 2 ? new Date(timeRange[0]) : undefined;
          const to = timeRange && timeRange.length === 2 ? new Date(timeRange[1]) : undefined;

          if (!view) {
            this.selectedView = ['Energy & Solar group 1', 'Data science/AI group 6'];
            console.log('Default Radar chart view: ', this.selectedView);
          } else {
            this.selectedView = [view];
            console.log('Radar chart view: ', this.selectedView);
          }

          return this.getEmoReadWriteByEmotionTitle(title, datasetLabel, from, to, this.selectedView);
        } else {
          return of([]); // Return an observable of an empty array
        }
      })
    ).subscribe(
      filteredData => {
        this.filteredEmoReadWrite = filteredData;
      },
      error => {
        console.error('Error fetching community data:', error);
      }
    );
  }

  currentSectionNumber: number = 1;

  getEmoReadWriteByEmotionTitle(emotionTitle: string, emotionLabel: string, fromDate?: Date, toDate?: Date, views?: string[]): Promise<any[]> {
  return new Promise<any[]>(resolve => {
    this.http.get<any[]>('http://localhost:3000/api/community-data').subscribe(dataList => {
      const filteredList = dataList.filter(data => {
        console.log(data);
        // Convert actionType and emotionLabel to lowercase for comparison
        const action = data.actionType.toLowerCase();
        const isActionTypeMatch = action === emotionLabel.toLowerCase();
        
        // TODO: Implement date range filtering
        // Convert created date to Date object and check if it falls within the range
        const createdDate = new Date(data.created);
        const isWithinDateRange = (!fromDate || createdDate >= fromDate) && (!toDate || createdDate <= toDate);

        // Check if any rating has an emotionId that contains emotionTitle
        const hasMatchingEmotion = data.ratings.some((rating: any) => {
          if (rating.emotionId.toLowerCase().includes(emotionTitle.toLowerCase())) {
            data.Intensity = data.Intensity || [];
            data.Intensity.push({ key: `${rating.emotionId}_Intensity`, value: rating.intensity });
            return true;
          }
          return false;
        });
        
        // TODO: Implement view filtering
        //const isInView = !views || data.inViews.some((view: any) => views.includes(view.title));

        return isActionTypeMatch && hasMatchingEmotion && isWithinDateRange ;
      });

      // filteredList.sort((a, b) => new Date(b.created).valueOf() - new Date(a.created).valueOf());

      resolve(filteredList);
      console.log(filteredList);
    });
  });
}

  filterList(selectedValue: string): void {
    console.log(selectedValue);
    if (selectedValue === 'Intensity') {
      this.filteredEmoReadWrite.sort((a, b) => {
        // Sort by intensity value in descending order
        const intensityA = a.Intensity[0]?.value || 0;
        const intensityB = b.Intensity[0]?.value || 0;
        return intensityB - intensityA;
      });
    } else {
      this.filteredEmoReadWrite.sort((a, b) => new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf());
    }
  }

  closeEmotionNote(): void {
    this.visibilityService.setVisibility('EmotionNote', false);
  }
}
