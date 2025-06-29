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
  userFirstName: string = '';

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

      this.fetchUserDataAndEmoReg();

      // Call the function to retrieve EmoReg objects
      // this.getEmoReg();
    });
  }

  setActiveSection(sectionIndex: number): void {
    this.activeSection = sectionIndex;
  }

  fetchUserDataAndEmoReg(): void {
    this.emotionService.getUserData().subscribe({
      next: (userData) => {
        this.userFirstName = userData.firstName;  // directly use firstName field
        this.getEmoReg();  // Once user is fetched, load EmoReg
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  sortReflectionsByTimestamp(): void {
    this.filteredEmoReg.sort((a, b) => {
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    });
  }

  getEmoReg(): void {
    this.emotionService.getEmoReg().subscribe(
      emoRegList => {
        this.filteredEmoReg = emoRegList
          .filter(emoReg => emoReg.UserID === this.userFirstName)  // adjust this field as needed
          .map(emoReg => ({
            ...emoReg,
            Timestamp: this.timeService.convertToDate(Number(emoReg.Timestamp))
          }));
        this.sortReflectionsByTimestamp();
      },
      error => {
        console.error('Error fetching EmoReg objects:', error);
      }
    );
  }

  // getEmoReg(): void {
  //   // Call the service to retrieve EmoReg objects
  //   this.emotionService.getEmoReg().subscribe(
  //     emoRegList => {
  //       // Store the retrieved EmoReg objects in filteredEmoRegAdd commentMore actions
  //       this.filteredEmoReg = emoRegList.map(emoReg => ({
  //         ...emoReg,
  //         Timestamp: this.timeService.convertToDate(Number(emoReg.Timestamp))
  //       }));
  //       // Sort the EmoReg objects by Timestamp in descending order
  //       this.sortReflectionsByTimestamp();
  //     },
  //     error => {
  //       // Handle error
  //       console.error('Error fetching EmoReg objects:', error);
  //     }
  //   );
  // }

}
