import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  // Initialize allQuestionsAnswered as false
  allQuestionsAnswered = false;

  // Update this function based on your actual logic
  checkIfAllQuestionsAnswered() {
    console.log('Checking questions...');
    // Example: Check if all 5 inputs are not empty
    this.allQuestionsAnswered = !!(
      this.formData.ReflectionTitle &&
      this.formData.Visualization &&
      this.formData.Challenges &&
      this.formData.ImprovementWays &&
      this.formData.PositivePlan &&
      this.formData.Action &&
      this.selectedUsers.length > 0
    );
  }

  constructor(private router: Router, private emotionService: EmotionService) {}

  // Method to handle selected users from dropdown
  onUserSelected(selectedUsers: string[]) {
    this.selectedUsers = selectedUsers;
    this.formData.GroupMembers = selectedUsers;
    console.log("Ok received: ", selectedUsers);

    // Trigger the check for all questions answered
    this.checkIfAllQuestionsAnswered();
  }

  handleTitleSelected(title: string): void {
    console.log('Selected Reflection Title:', title);
    this.formData.ReflectionTitle = title; // Set the Reflection Title in formData

    // Trigger the check for all questions answered
    this.checkIfAllQuestionsAnswered();
  } 

  submit() {
    console.log(this.formData);
    this.emotionService.addReg(this.formData).subscribe(() => {
      this.router.navigate(['reflect-history']);
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
