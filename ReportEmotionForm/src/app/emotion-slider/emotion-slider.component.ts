import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmotionService } from '../services/emotion.service';
import { EmoSurvey } from '../services/emotion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'app-emotion-slider',
  templateUrl: './emotion-slider.component.html',
  styleUrl: './emotion-slider.component.css',
})
export class EmotionSliderComponent implements OnInit {
  feelingsForm!: FormGroup;

  options = [
    { id: 'Joyful', label: 'Joyful' },
    { id: 'Curious', label: 'Curious' },
    { id: 'Surprised', label: 'Surprised' },
    { id: 'Confused', label: 'Confused' },
    { id: 'Anxious', label: 'Anxious' },
    { id: 'Frustrated', label: 'Frustrated' },
    { id: 'Bored', label: 'Bored' },
  ];

  constructor(
    private fb: FormBuilder,
    private emotionService: EmotionService, // Inject your EmotionService here
    private snackBar: MatSnackBar,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    this.feelingsForm = this.fb.group({
      Joyful: [0],
      Curious: [0],
      Surprised: [0],
      Confused: [0],
      Anxious: [0],
      Frustrated: [0],
      Bored: [0],
      Inconducive: this.fb.array([]),
      Reason: [''],
      Remarks: ['']
    });
  }

  getEmoji(id: string): string {
    switch (id) {
      case 'Joyful': return '😀';
      case 'Curious': return '😳';
      case 'Surprised': return '😲';
      case 'Confused': return '😕';
      case 'Anxious': return '😰';
      case 'Frustrated': return '😣';
      case 'Bored': return '🥱';
      default: return '';
    }
  }

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inconducive: FormArray = this.feelingsForm.get('Inconducive') as FormArray;
    if (input.checked) {
      inconducive.push(new FormControl(input.value));
    } else {
      const index = inconducive.controls.findIndex((control: any) => control.value === input.value);
      inconducive.removeAt(index);
    }
  }

  onSubmit(): void {
    const communityId = this.communityService.getCurrentCommunityId();
    console.log('Current community ID from service:', communityId);
    
    if (communityId) {
      this.feelingsForm.patchValue({ communityID: communityId });
      console.log('Community ID set in form:', communityId);
    } else {
      console.error('No community ID set. Cannot submit with community context.');
      this.openSnackBar('Error: No community context found. Please access this form through the proper link.', 'Close');
      return;
    }
    
    if (this.feelingsForm.valid) {
      console.log('Form submitted successfully!');
      console.log('Form data:', this.feelingsForm.value);

      // Call the addEmoSurvey function from the EmotionService
      this.emotionService.addEmoSurvey(this.feelingsForm.value).subscribe({
        next: (EmoSurvey: any) => {
          console.log('EmoSurvey added successfully!', EmoSurvey.Timestamp);
          this.openSnackBar('Form submitted successfully!', 'Close');
        },
        error: (error: any) => {
          console.error('Error adding EmoSurvey:', error);
          this.openSnackBar(
            'Error submitting form. Please try again.',
            'Close'
          );
        }
      });
    } else {
      console.log('Please answer all compulsory questions.');
      this.openSnackBar('Please answer all compulsory questions.', 'Close');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // 3 seconds
      horizontalPosition: 'center', // Center horizontally
      verticalPosition: 'top', // Center vertically
      panelClass: ['custom-snackbar'], // Apply custom styling
    });
  }
}
