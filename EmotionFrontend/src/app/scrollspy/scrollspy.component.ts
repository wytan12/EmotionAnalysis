import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoSurvey} from "../services/emotion";
import { TimeService } from '../services/time.service';
import {map} from "rxjs/operators";
import { TitleService } from '../title.service';
import { Observable } from 'rxjs';

@Component({
	selector: "app-scrollspy",
	templateUrl: "./scrollspy.component.html",
	styleUrls: ["./scrollspy.component.css"]
  })

export class ScrollspyComponent {
	title: string = '';
  filteredEmoSurveys: EmoSurvey[] = [];

  constructor(private route: ActivatedRoute,
    private emotionService: EmotionService,
    private timeService: TimeService,
    private titleService: TitleService) {
      
     }

  ngOnInit() {
    // // Subscribe to changes in the route parameters
    // this.route.queryParams.subscribe(params => {
    //   // Retrieve the 'title' parameter from the query parameters
    //   this.title = params['title'];
    this.titleService.selectedTitle$.subscribe((title: string| null) => {
      if(title){
        console.log('Title received:', title);
        this.title = title;
        this.getEmoSurveyByEmotionTitle(this.title).then(filteredData => {
          this.filteredEmoSurveys = filteredData;
        });
      }
       // Set the title in the component property
    });
   
  }

  activeSection: number = 0 ;
  setActiveSection(sectionIndex: number) {
    this.activeSection = sectionIndex;
  }

  currentSectionNumber: number = 1;

  getEmoSurveyByEmotionTitle(emotionTitle: string): Promise<EmoSurvey[]> {
    return new Promise<EmoSurvey[]>(resolve => {
      this.emotionService.getEmoSurvey().subscribe(emoSurveyList => {
        // Filter the list based on the emotion title
        const filteredList = emoSurveyList.filter(emoSurvey => {
          emoSurvey.Timestamp = this.timeService.convertToDate(Number(emoSurvey.Timestamp)*1000);
          console.log(emoSurvey.Timestamp)
          return emoSurvey.Inconducive == emotionTitle;
        });

        // Sort the filtered list by timestamp in descending order
        filteredList.sort((a, b) => new Date(b.Timestamp).valueOf() - new Date(a.Timestamp).valueOf());

        resolve(filteredList);
      });
    });
  }

  




}

