import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityService } from '../services/community.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { EmotionService } from '../services/emotion.service';

@Component({
  selector: 'app-reflect-form',
  templateUrl: './reflect-form.component.html',
  styleUrl: './reflect-form.component.css',
})
export class ReflectFormComponent {
  formData: any = {};
  selectedUsers: string[] = [];
  selectedTitle: string | null = null;

  constructor(
    private router: Router, 
    private emotionService: EmotionService,
    private communityService: CommunityService
  ) {}

  // Method to handle selected users from dropdown
  onUserSelected(selectedUsers: string[]) {
    this.selectedUsers = selectedUsers;
    this.formData.GroupMembers = selectedUsers;
    console.log("Ok received: ", selectedUsers);
  }

  handleTitleSelected(title: string): void {
    console.log('Selected Reflection Title:', title);
    this.selectedTitle = title;                 // <- update this
    this.formData.ReflectionTitle = title;      // keep storing it too
  } 

  submit() {
    const communityId = this.communityService.getCurrentCommunityId();

    if (communityId) {
      this.formData.communityID = communityId;  // 👈 add it here
    } else {
      console.error('No community ID set. Cannot submit with community context.');
    }
    console.log(this.formData);
    this.emotionService.addReg(this.formData).subscribe(() => {
      // Navigate while preserving community context
      this.communityService.navigateInCommunity('reflect-history');
    }, error => {
      console.error('Error submitting form data:', error);
    });
  }

  onSubmitClick() {
    // Call both functions
    // this.goToReflectHistory();
    this.submit();
  }
}