import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite} from "../services/emotion";
import { TimeService } from '../services/time.service';
import { TitleService } from '../title.service';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  constructor(private route: ActivatedRoute,
    private emotionService: EmotionService,
    private timeService: TimeService,
    private titleService: TitleService) { }

  // Assuming you have a property to store the filtered data
  filteredEmoReadWrite: EmoReadWrite[] = [];
  // ngOnInit() {
  //   // Subscribe to changes in the route parameters
  //   // this.route.queryParams.subscribe(params => {
  //   //   // Retrieve the 'title' parameter from the query parameters
  //   //   this.title = params['title'];
  //   //   this.datasetLabel = params['datasetLabel'];
  //   this.titleService.selectedTitle$.subscribe((title: string| null) => {
  //     // Check if 'title' parameter exists before using it
  //   if (title) {
  //     this.title = title;
  //     this.titleService.selectedLabel$.subscribe((datasetLabel: string| null) => {
  //     this.datasetLabel = datasetLabel;
  //     // Call the function to filter EmoSurvey objects based on the 'title'
  //     this.getEmoReadWriteByEmotionTitle(this.title, this.datasetLabel).then(filteredData => {
  //       // Store the filtered data in the component property
  //       const intensityKey = `${this.title}_Intensity`;
  //       this.intensityKey = intensityKey;
  //       this.filteredEmoReadWrite = filteredData;
  //     });
      
  ngOnInit() {
    // Combine latest observables for title and dataset label
    combineLatest([
      this.titleService.selectedTitle$,
      this.titleService.selectedLabel$
    ]).pipe(
      switchMap(([title, datasetLabel]) => {
        if (title && datasetLabel) {
          this.title = title;
          this.datasetLabel = datasetLabel;
          const intensityKey = `${title}_Intensity`;
          this.intensityKey = intensityKey;

          // Assuming getEmoReadWriteByEmotionTitle returns an Observable
          return this.getEmoReadWriteByEmotionTitle(title, datasetLabel);
        } else {
          // Properly handle the scenario where one or both are null
          return []; // This needs to be an Observable, might need adjustments based on your service implementation
        }
      })
    ).subscribe(filteredData => {
      this.filteredEmoReadWrite = filteredData;
    }, error => {
      console.error('Error fetching EmoReadWrite data:', error);
    });
  }

  currentSectionNumber: number = 1;

    
  getEmoReadWriteByEmotionTitle(emotionTitle: string, emotionLabel: string): Promise<EmoReadWrite[]> {
    return new Promise<EmoReadWrite[]>(resolve => {
      this.emotionService.getEmoReadWrite().subscribe(emoReadWriteList => {
        // Filter the list based on the emotion title and any emotion having a value of 1
        const filteredList = emoReadWriteList.filter(emoReadWrite => {
          emoReadWrite.Timestamp = this.timeService.convertToDate(Number(emoReadWrite.Timestamp)*1000);
          const hasEmotionWithValueOne = Object.keys(emoReadWrite).some((key: string) => {
          const typedKey = key as keyof EmoReadWrite;  // Type assertion
            if (typedKey.toLowerCase() == emotionTitle.toLowerCase() && typeof emoReadWrite[typedKey] == 'number' && emoReadWrite.ActionType == emotionLabel ) {
              // get the intensity map to the title 
              const intensityKey = `${emotionTitle}_Intensity`as keyof EmoReadWrite;
              const intensityValue = parseFloat(emoReadWrite[intensityKey] as string);
              emoReadWrite.Intensity = emoReadWrite.Intensity || [];
              emoReadWrite.Intensity.push({ key: intensityKey, value: intensityValue })
              console.log(intensityKey);
              console.log(intensityValue);
              console.log(emoReadWrite[intensityKey]);
              // Check if the intensity key matches the emotion title and return the intensity
            return emoReadWrite[typedKey] == 1;
          }
            return false;
          });
          
          return hasEmotionWithValueOne;
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


  
}
