import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./test-noterating.component.css'],
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

  isLoading = true;
  filteredEmoReadWrite: any[] = [];
  filteredUniqueEmoReadWrite: any[] = [];
  intensityCounts: {
    [noteId: string]: {
      [emotionId: string]: {
        intensity_1star: number;
        intensity_2star: number;
        intensity_3star: number;
      };
    };
  } = {};
  currentSectionNumber: number = 1; // Add this line


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private timeService: TimeService,
    private sharedTimeService: SharedTimeService,
    private titleService: TitleService,
    private sharedViewService: SharedViewService,
    private visibilityService: NoteVisibilityService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
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

            // this.selectedView = Array.isArray(view) ? view : view ? [view] : [];
            if (view) {
              this.selectedView = view.includes(',')
                ? view.split(',').map((v) => v.trim())
                : [view.trim()];
            } else {
              this.sharedViewService.getViews().subscribe((views: string[]) => {
                this.selectedView = views;
              });
            }

            console.log('Selected views:', this.selectedView);

            return this.getEmoReadWriteByEmotionTitle(
              title,
              datasetLabel,
              from,
              to,
              this.selectedView
            );
          } else {
            return of([]); // Return an observable of an empty array
          }
        })
      )
      .subscribe(
        (filteredData) => {
          this.filteredEmoReadWrite = filteredData;
          this.updateUniqueEmoReadWrite(); // Update unique items
          this.calculateIntensityCounts(filteredData);
          this.cdr.detectChanges(); // Trigger change detection
          this.isLoading = false; // End loading
        },
        (error) => {
          console.error('Error fetching community data:', error);
          this.isLoading = false; // End loading
        }
      );
  }

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

            const title = data.inViews[0]?.title;
            const isInView = views == undefined || views.includes(title);

            return (
              isActionTypeMatch &&
              hasMatchingEmotion &&
              isWithinDateRange &&
              isInView
            );
          });

          resolve(filteredList);
        });
    });
  }

  calculateIntensityCounts(filteredData: any[]): void {
    this.intensityCounts = filteredData.reduce((acc: any, curr: any) => {
      const noteId = curr.note._id;

      if (!acc[noteId]) {
        acc[noteId] = {};
      }

      curr.ratings.forEach((rating: any) => {
        const emotionId = rating.emotionId;
        const intensity = rating.intensity;

        if (!acc[noteId][emotionId]) {
          acc[noteId][emotionId] = {
            intensity_1star: 0,
            intensity_2star: 0,
            intensity_3star: 0,
          };
        }

        if (intensity === 1) {
          acc[noteId][emotionId].intensity_1star += 1;
        } else if (intensity === 2) {
          acc[noteId][emotionId].intensity_2star += 1;
        } else if (intensity === 3) {
          acc[noteId][emotionId].intensity_3star += 1;
        }
      });

      return acc;
    }, {});
  }

  getIntensityCount(
    noteId: string,
    emotionId: string,
    intensity: number
  ): number {
    const noteData = this.intensityCounts[noteId];
    if (noteData && noteData[emotionId]) {
      const key = `intensity_${intensity}star` as
        | 'intensity_1star'
        | 'intensity_2star'
        | 'intensity_3star';
      return noteData[emotionId][key] || 0;
    }
    return 0;
  }

  getWriteIntensityValue(noteId: string, emotionId: string): number {
    const noteData = this.intensityCounts[noteId];
    if (noteData && noteData[emotionId]) {
      // Determine the highest intensity level
      const intensities = [1, 2, 3];
      let maxIntensity = 0;

      for (const intensity of intensities) {
        const key = `intensity_${intensity}star` as
          | 'intensity_1star'
          | 'intensity_2star'
          | 'intensity_3star';
        if (noteData[emotionId][key] > 0) {
          maxIntensity = intensity;
        }
      }

      return maxIntensity;
    }
    return 0;
  }

  filterList(selectedValue: string): void {
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

    // Update filteredUniqueEmoReadWrite after filtering
    this.updateUniqueEmoReadWrite();
    this.cdr.detectChanges(); // Trigger change detection
  }

  closeEmotionNote(): void {
    this.visibilityService.setVisibility('EmotionNote', false);
  }

  // Method to update filteredUniqueEmoReadWrite
  updateUniqueEmoReadWrite(): void {
    const seenIds = new Set<string>();
    this.filteredUniqueEmoReadWrite = this.filteredEmoReadWrite.filter((item) => {
      if (!seenIds.has(item.note._id)) {
        seenIds.add(item.note._id);
        return true;
      }
      return false;
    });
  }
}
