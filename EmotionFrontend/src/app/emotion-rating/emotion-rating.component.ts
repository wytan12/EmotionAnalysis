import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoSurvey} from "../services/emotion";

@Component({
  selector: 'app-emotion-rating',
  templateUrl: './emotion-rating.component.html',
  styleUrl: './emotion-rating.component.css'
})
export class EmotionRatingComponent {
  title: string = '';
  datasetLabel: string = '';

  constructor(private route: ActivatedRoute,
    private emotionService: EmotionService) { }

  // Assuming you have a property to store the filtered data
  filteredEmoSurveys: EmoSurvey[] = [];
  ngOnInit() {
    // Subscribe to changes in the route parameters
    this.route.queryParams.subscribe(params => {
      // Retrieve the 'title' parameter from the query parameters
      this.title = params['title'];
      this.datasetLabel = params['datasetLabel'];

    //   // Check if 'title' parameter exists before using it
    // if (this.title) {
    //   // Call the function to filter EmoSurvey objects based on the 'title'
    //   this.getEmoSurveyByEmotionTitle(this.title).then(filteredData => {
    //     // Store the filtered data in the component property
    //     this.filteredEmoSurveys = filteredData;
    //   });
    // }
    });
  }

  currentSectionNumber: number = 1;

  // public getEmoSurveyByEmotionTitle(title: string): Promise<EmoSurvey[]> {
  //   // Assuming emoSurveyData is your data array
  //   return new Promise(resolve => {
  //     // Filter data based on the 'title' parameter
  //     const filteredData = EmoSurvey.filter(item => item.title === title);
  //     resolve(filteredData);
  //   });
    
  // public getEmoSurveyByEmotionTitle(emotionTitle: string): Promise<EmoSurvey[]> {
  //   return new Promise<EmoSurvey[]>(resolve => {
  //     this.emotionService.getEmoSurvey().subscribe(emoSurveyList => {
  //       // Filter the list based on the emotion title
  //       const filteredList = emoSurveyList.filter(emoSurvey => {
  //         // Assuming that the emotion property is a string property in EmoSurvey
  //         return emoSurvey.Inconducive === emotionTitle;
  //       });
  
  //       resolve(filteredList);
  //     });
  //   });
  // }
}
