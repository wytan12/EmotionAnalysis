import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmotionService } from '../services/emotion.service';
import { EmoSurvey } from '../services/emotion';
import { TimeService } from '../services/time.service';
import { TitleService } from '../services/title.service';
import { SharedTimeService } from '../services/shared-time.service';
import { NoteVisibilityService } from '../services/note-visibility.service';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'app-scrollspy',
  templateUrl: './scrollspy.component.html',
  styleUrls: ['./scrollspy.component.css'],
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
    private visibilityService: NoteVisibilityService,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    const currentCommunityId = this.communityService.getCurrentCommunityId();
    console.log('Scrollspy initialized with community ID:', currentCommunityId);

    this.visibilityService
      .getVisibilityObservable('SurveyNote')
      .subscribe((visible) => {
        this.isVisible = visible;
      });

    this.titleService.selectedTitle$.subscribe((title: string | null) => {
      if (title !== null) {
        console.log('Title selected in scrollspy:', title);
        this.title = title;
        this.tryFetchData();
      } else {
        console.log('Title cleared in scrollspy - showing all surveys');
        this.title = '';
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

    // Initial data fetch when component loads
    console.log('Scrollspy component initialized - fetching initial data');
    this.tryFetchData();
  }

  setActiveSection(sectionIndex: number): void {
    this.activeSection = sectionIndex;
  }

  convertTimestampToDate(timestamp: string): string {
    const ms = Number(timestamp);
    return new Date(ms).toLocaleString(); // or use Angular DatePipe if needed
  }

  private tryFetchData(): void {
    // Always fetch data - either filtered by title or showing all
    const [from, to] = this.selectedTimeRange;
    this.getData(from ?? undefined, to ?? undefined);
  }

  private getEmoSurveyByEmotionTitle(
    emotionTitle: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<EmoSurvey[]> {
    return new Promise<EmoSurvey[]>((resolve) => {
      this.emotionService.getEmoSurvey().subscribe((emoSurveyList) => {
        console.log('All survey data received:', emoSurveyList);

        let filteredList: EmoSurvey[];

        if (!emotionTitle || emotionTitle.trim() === '') {
          // If no emotion title is selected, show all surveys
          console.log('No emotion title selected, showing all surveys');
          filteredList = emoSurveyList;
        } else {
          // Filter by inconducive emotions or by emotion ratings
          filteredList = emoSurveyList.filter((emoSurvey) => {
            const timestampDate = new Date(Number(emoSurvey.Timestamp));
            const matchesInconducive =
              emoSurvey.Inconducive.includes(emotionTitle);

            // Also check if the emotion has a high rating (3 or above)
            const emotionRating = this.getEmotionRating(
              emoSurvey,
              emotionTitle
            );
            const hasHighRating = emotionRating >= 3;

            const inRange =
              (!fromDate || timestampDate >= fromDate) &&
              (!toDate || timestampDate <= toDate);

            console.log('Survey item:', {
              timestamp: timestampDate,
              inconducive: emoSurvey.Inconducive,
              matchesInconducive,
              emotionTitle,
              emotionRating,
              hasHighRating,
              inRange,
            });

            return (matchesInconducive || hasHighRating) && inRange;
          });
        }

        // Sort by timestamp (newest first)
        filteredList = filteredList.sort(
          (a, b) =>
            new Date(Number(b.Timestamp) * 1000).getTime() -
            new Date(Number(a.Timestamp) * 1000).getTime()
        );

        console.log('Filtered survey data:', filteredList);
        resolve(filteredList);
      });
    });
  }

  private getEmotionRating(emoSurvey: EmoSurvey, emotionTitle: string): number {
    switch (emotionTitle.toLowerCase()) {
      case 'joyful':
        return emoSurvey.Joyful || 0;
      case 'curious':
        return emoSurvey.Curious || 0;
      case 'surprised':
        return emoSurvey.Surprised || 0;
      case 'confused':
        return emoSurvey.Confused || 0;
      case 'anxious':
        return emoSurvey.Anxious || 0;
      case 'frustrated':
        return emoSurvey.Frustrated || 0;
      case 'bored':
        return emoSurvey.Bored || 0;
      default:
        return 0;
    }
  }

  private getData(from?: Date, to?: Date): void {
    const [storedFrom, storedTo] = this.selectedTimeRange;
    const start = from || storedFrom || undefined;
    const end = to || storedTo || undefined;

    this.getEmoSurveyByEmotionTitle(this.title, start, end).then((filtered) => {
      this.filteredEmoSurveys = filtered;
    });
  }
}
