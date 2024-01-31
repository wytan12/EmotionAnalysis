import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoSurvey} from "../services/emotion";
import { TimeService } from '../services/time.service';
import {map} from "rxjs/operators";

@Component({
	selector: "app-scrollspy",
	templateUrl: "./scrollspy.component.html",
	styleUrls: ["./scrollspy.component.css"]
  })

export class ScrollspyComponent {
	title: string = '';


  constructor(private route: ActivatedRoute,
    private emotionService: EmotionService,
    private timeService: TimeService) { }

  // Assuming you have a property to store the filtered data
  filteredEmoSurveys: EmoSurvey[] = [];
  ngOnInit() {
    // Subscribe to changes in the route parameters
    this.route.queryParams.subscribe(params => {
      // Retrieve the 'title' parameter from the query parameters
      this.title = params['title'];

      // Check if 'title' parameter exists before using it
    if (this.title) {
      // Call the function to filter EmoSurvey objects based on the 'title'
      this.getEmoSurveyByEmotionTitle(this.title).then(filteredData => {
        // Store the filtered data in the component property
        this.filteredEmoSurveys = filteredData;
      });
    }
    });
  }

  activeSection: number = 0 ;
  setActiveSection(sectionIndex: number) {
    this.activeSection = sectionIndex;
  }

  currentSectionNumber: number = 1;

  // public data:number[] =[];


  // async getData() {
  //   const dataHttp = await this.getDataHttp();
  //   this.title = dataHttp;
  //   console.log(this.data);
  //   this.barChartData[0].data= this.data;
  //   this.chart?.update();
  // }
  public getEmoSurveyByEmotionTitle(emotionTitle: string): Promise<EmoSurvey[]> {
    return new Promise<EmoSurvey[]>(resolve => {
      this.emotionService.getEmoSurvey().subscribe(emoSurveyList => {
        // Filter the list based on the emotion title
        const filteredList = emoSurveyList.filter(emoSurvey => {
          emoSurvey.Timestamp = this.timeService.convertToDate(Number(emoSurvey.Timestamp)*1000);
          console.log(emoSurvey.Timestamp)
          return emoSurvey.Inconducive == emotionTitle;
        });
        // filteredList.forEach(emoSurvey => {
        //   // console.log(emoSurvey.Timestamp);
        //   // console.log(Number(emoSurvey.Timestamp));
        //   emoSurvey.Timestamp = this.timeService.convertToDate(Number(emoSurvey.Timestamp));
        //   // console.log(emoSurvey.Timestamp);
        // });
        resolve(filteredList);
      });
    });
  }

  




}

