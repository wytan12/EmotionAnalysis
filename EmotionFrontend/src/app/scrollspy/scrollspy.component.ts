import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoSurvey} from "../services/emotion";
import { TimeService } from '../services/time.service';
import {map} from "rxjs/operators";
import { TitleService } from '../services/title.service';
import { SharedTimeService } from '../services/shared-time.service';
import { Observable } from 'rxjs';
import { NoteVisibilityService } from '../services/note-visibility.service';

@Component({
	selector: "app-scrollspy",
	templateUrl: "./scrollspy.component.html",
	styleUrls: ["./scrollspy.component.css"]
  })

export class ScrollspyComponent {
	title: string = '';
  filteredEmoSurveys: EmoSurvey[] = [];
  selectedTimeRange: [Date | null, Date | null] = [null, null];
  isVisible = true;

  constructor(private route: ActivatedRoute,
    private emotionService: EmotionService,
    private timeService: TimeService,
    private sharedTimeService: SharedTimeService,
    private titleService: TitleService,
    private visibilityService: NoteVisibilityService) {
      
     }

  ngOnInit() {
    // // Subscribe to changes in the route parameters
    // this.route.queryParams.subscribe(params => {
    //   // Retrieve the 'title' parameter from the query parameters
    //   this.title = params['title'];
    this.visibilityService.getVisibilityObservable('SurveyNote').subscribe(visible => {
      this.isVisible = visible;
    });
    this.titleService.selectedTitle$.subscribe((title: string| null) => {
      if(title){
        console.log('Title received:', title);
        this.title = title;
        this.getData(); // Fetch data with the current time range
        // this.getEmoSurveyByEmotionTitle(this.title).then(filteredData => {
        //   this.filteredEmoSurveys = filteredData;
        // });
      }
       // Set the title in the component property
    });
    
    // Time service subscription
    this.sharedTimeService.selectedTime$.subscribe((timeRange: number[]) => {
      if (timeRange && timeRange.length === 2) {
          const from = new Date(timeRange[0]);
          console.log("From Date: ", from);
          const to = new Date(timeRange[1]);
          console.log("To Date: ", to);
          this.selectedTimeRange = [from, to];
          this.getData(from, to);
      } else {
          this.selectedTimeRange = [null, null];
          this.getData();
      }
    });

    // this.sharedTimeService.selectedTime$.subscribe((timeRange: number[]) => {
    //   console.log('Selected time range:', timeRange);
    // });
   
  }

  activeSection: number = 0 ;
  setActiveSection(sectionIndex: number) {
    this.activeSection = sectionIndex;
  }

  currentSectionNumber: number = 1;


  getEmoSurveyByEmotionTitle(emotionTitle: string, fromDate?: Date, toDate?: Date): Promise<EmoSurvey[]> {
    return new Promise<EmoSurvey[]>(resolve => {
        this.emotionService.getEmoSurvey().subscribe(emoSurveyList => {
            // Filter the list based on the emotion title and timestamp range
            const filteredList = emoSurveyList.filter(emoSurvey => {
                emoSurvey.Timestamp = this.timeService.convertToDate(Number(emoSurvey.Timestamp) * 1000);
                console.log(emoSurvey.Timestamp);

                const isEmotionMatch = emoSurvey.Inconducive.includes(emotionTitle);
                const isWithinDateRange = (!fromDate || new Date(emoSurvey.Timestamp) >= fromDate) && 
                                           (!toDate || new Date(emoSurvey.Timestamp) <= toDate);
                
                return isEmotionMatch && isWithinDateRange;
            });

            // Sort the filtered list by timestamp in descending order
            filteredList.sort((a, b) => new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf());

            resolve(filteredList);
        });
    });
  }

  getData(from?: Date, to?: Date) {
    if (this.title) {
      const [storedFromDate, storedToDate] = this.selectedTimeRange;
      this.getEmoSurveyByEmotionTitle(
        this.title, 
        from || (storedFromDate !== null ? storedFromDate : undefined), 
        to || (storedToDate !== null ? storedToDate : undefined)
      ).then(filteredList => {
        this.filteredEmoSurveys = filteredList;
      });
    }
  }

  




}

