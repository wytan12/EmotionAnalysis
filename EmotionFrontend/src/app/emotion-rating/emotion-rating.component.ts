import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite} from "../services/emotion";
import { TimeService } from '../services/time.service';
import { SharedTimeService } from '../services/shared-time.service';
import { TitleService } from '../services/title.service';
import { SharedViewService } from '../services/shared-view.service';
import { combineLatest , of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NoteVisibilityService } from '../services/note-visibility.service';

@Component({
  selector: 'app-emotion-rating',
  templateUrl: './emotion-rating.component.html',
  styleUrl: './emotion-rating.component.css'
})
export class EmotionRatingComponent {
  title: string = '';
  datasetLabel: string = '';
  intensity: number | null = null;
  intensityKey: any;
  selectedTimeRange: [Date | null, Date | null] = [null, null];
  selectedView: string[] = [];
  Math: any;
  isVisible = true;

  constructor(private route: ActivatedRoute,
    private emotionService: EmotionService,
    private timeService: TimeService,
    private sharedTimeService: SharedTimeService,
    private titleService: TitleService,
    private sharedViewService: SharedViewService,
    private visibilityService: NoteVisibilityService) { }

  // Assuming you have a property to store the filtered data
  filteredEmoReadWrite: EmoReadWrite[] = [];
      
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
          const intensityKey = `${title}_Intensity`;
          this.intensityKey = intensityKey;

      //     // Assuming getEmoReadWriteByEmotionTitle returns an Observable
      //     return this.getEmoReadWriteByEmotionTitle(title, datasetLabel);
      //   } else {
      //     // Properly handle the scenario where one or both are null
      //     return []; // This needs to be an Observable, might need adjustments based on your service implementation
      //   }
      // })
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
    ).subscribe(filteredData => {
      this.filteredEmoReadWrite = filteredData;
    }, error => {
      console.error('Error fetching EmoReadWrite data:', error);
    });


  }

  currentSectionNumber: number = 1;

  getEmoReadWriteByEmotionTitle(emotionTitle: string, emotionLabel: string, fromDate?: Date, toDate?: Date, views?: string[]): Promise<EmoReadWrite[]> {
    return new Promise<EmoReadWrite[]>(resolve => {
      this.emotionService.getEmoReadWrite().subscribe(emoReadWriteList => {
        const filteredList = emoReadWriteList.filter(emoReadWrite => {
          emoReadWrite.Timestamp = this.timeService.convertToDate(Number(emoReadWrite.Timestamp) * 1000);

          const isWithinDateRange = (!fromDate || new Date(emoReadWrite.Timestamp) >= fromDate) &&
                                    (!toDate || new Date(emoReadWrite.Timestamp) <= toDate);

          const hasEmotionWithValueOne = Object.keys(emoReadWrite).some((key: string) => {
            const typedKey = key as keyof EmoReadWrite;
            if (typedKey.toLowerCase() === emotionTitle.toLowerCase() && typeof emoReadWrite[typedKey] === 'number' && emoReadWrite.ActionType === emotionLabel) {
              const intensityKey = `${emotionTitle}_Intensity` as keyof EmoReadWrite;
              const intensityValue = parseFloat(emoReadWrite[intensityKey] as string);
              emoReadWrite.Intensity = emoReadWrite.Intensity || [];
              emoReadWrite.Intensity.push({ key: intensityKey, value: intensityValue });
              return emoReadWrite[typedKey] === 1;
            }
            return false;
          });

          const isInView = !views || views.includes(emoReadWrite.Views);

          return hasEmotionWithValueOne && isWithinDateRange && isInView;
        });

        filteredList.sort((a, b) => new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf());

        resolve(filteredList);
      });
    });
  }
  

  filterList(selectedValue: string): void {

    console.log(selectedValue);
    if (selectedValue == "Intensity" ) {
      this.filteredEmoReadWrite.sort((a, b) => {
        // Sort by intensity value in descending order
        const intensityA = a.Intensity[0]?.value || 0;
        const intensityB = b.Intensity[0]?.value || 0;
        return intensityB - intensityA;
      });
      
    }
    else{
      this.filteredEmoReadWrite.sort((a, b) => new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf());
    }
   
  }

  closeEmotionNote(): void {
    this.visibilityService.setVisibility('EmotionNote', false);
  }

  
}
