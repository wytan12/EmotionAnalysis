import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmotionService} from "../services/emotion.service";
import {EmoReg} from "../services/emotion";
import { TimeService } from '../services/time.service';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-reflect-history',
  templateUrl: './reflect-history.component.html',
  styleUrl: './reflect-history.component.css'
})
export class ReflectHistoryComponent {
  title: string = 'Reflection History';
  filteredEmoReg: EmoReg[] = []; // Initialize the array to store EmoReg objects
  activeSection: number = 0;
  currentSectionNumber: number = 1;

  constructor(
    private route: ActivatedRoute,
    private emotionService: EmotionService,
    private timeService: TimeService
  ) {}

  ngOnInit(): void {
    // Subscribe to changes in the route parameters
    this.route.queryParams.subscribe(params => {
      // Retrieve the 'a' parameter from the query parameters
      this.title = params['a'];

      // Call the function to retrieve EmoReg objects
      this.getEmoReg();
    });
  }

  setActiveSection(sectionIndex: number): void {
    this.activeSection = sectionIndex;
  }

  getEmoReg(): void {
    // Call the service to retrieve EmoReg objects
    this.emotionService.getEmoReg().subscribe(
      emoRegList => {
        // Store the retrieved EmoReg objects in filteredEmoReg
        this.filteredEmoReg = emoRegList.map(emoReg => ({
          ...emoReg,
          Timestamp: this.timeService.convertToDate(Number(emoReg.Timestamp))
        }));
        // Sort the EmoReg objects by Timestamp in descending order
        this.sortReflectionsByTimestamp();
      },
      error => {
        // Handle error
        console.error('Error fetching EmoReg objects:', error);
      }
    );
  }

  sortReflectionsByTimestamp(): void {
    this.filteredEmoReg.sort((a, b) => {
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    });
  }
}
