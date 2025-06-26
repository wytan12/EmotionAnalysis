import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmotionService } from '../services/emotion.service';
import { EmoSurvey } from '../services/emotion';
import { TimeService } from '../services/time.service';
import { TitleService } from '../services/title.service';
import { SharedTimeService } from '../services/shared-time.service';
import { NoteVisibilityService } from '../services/note-visibility.service';

@Component({
  selector: 'app-scrollspy',
  templateUrl: './scrollspy.component.html',
  styleUrls: ['./scrollspy.component.css']
})
export class ScrollspyComponent implements OnInit {
  title: string = '';
  filteredEmoSurveys: EmoSurvey[] = [];
  selectedTimeRange: [Date | null, Date | null] = [null, null];
  isVisible = true;
  activeSection: number = 0;
  currentSectionNumber: number = 1;

  constructor(
    private route: ActivatedRoute,
    private emotionService: EmotionService,
    private timeService: TimeService,
    private sharedTimeService: SharedTimeService,
    private titleService: TitleService,
    private visibilityService: NoteVisibilityService
  ) {}

  ngOnInit(): void {
    this.visibilityService.getVisibilityObservable('SurveyNote').subscribe(visible => {
      this.isVisible = visible;
    });

    this.titleService.selectedTitle$.subscribe((title: string | null) => {
      if (title) {
        this.title = title;
        this.tryFetchData();
      }
    });

    this.sharedTimeService.selectedTime$.subscribe((timeRange: number[]) => {
      if (timeRange && timeRange.length === 2) {
        const from = new Date(timeRange[0]);
        const to = new Date(timeRange[1]);
        this.selectedTimeRange = [from, to];
      } else {
        this.selectedTimeRange = [null, null];
      }
      this.tryFetchData();
    });
  }

  setActiveSection(sectionIndex: number): void {
    this.activeSection = sectionIndex;
  }

  convertTimestampToDate(timestamp: string): string {
    const ms = Number(timestamp) * 1000;
    return new Date(ms).toLocaleString(); // or use Angular DatePipe if needed
  }
  
  private tryFetchData(): void {
    if (this.title) {
      const [from, to] = this.selectedTimeRange;
      this.getData(from ?? undefined, to ?? undefined);
    }
  }

  private getEmoSurveyByEmotionTitle(
    emotionTitle: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<EmoSurvey[]> {
    return new Promise<EmoSurvey[]>(resolve => {
      this.emotionService.getEmoSurvey().subscribe(emoSurveyList => {
        const filteredList = emoSurveyList
          .filter(emoSurvey => {
            const timestampDate = new Date(Number(emoSurvey.Timestamp) * 1000);
            const matchesEmotion = emoSurvey.Inconducive.includes(emotionTitle);
            const inRange =
              (!fromDate || timestampDate >= fromDate) &&
              (!toDate || timestampDate <= toDate);
            return matchesEmotion && inRange;
          })
          .sort((a, b) =>
            new Date(Number(b.Timestamp) * 1000).getTime() -
            new Date(Number(a.Timestamp) * 1000).getTime()
          );

        resolve(filteredList);
      });
    });
  }

  private getData(from?: Date, to?: Date): void {
    const [storedFrom, storedTo] = this.selectedTimeRange;
    const start = from || storedFrom || undefined;
    const end = to || storedTo || undefined;

    this.getEmoSurveyByEmotionTitle(this.title, start, end).then(filtered => {
      this.filteredEmoSurveys = filtered;
    });
  }
}
