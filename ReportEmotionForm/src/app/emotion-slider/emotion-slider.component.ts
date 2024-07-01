import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmotionService } from '../services/emotion.service';
import { EmoSurvey } from '../services/emotion';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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

  onCheckboxChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const inconducive: FormArray = this.feelingsForm.get('Inconducive') as FormArray;
    if (input.checked) {
      inconducive.push(new FormControl(input.value));
    } else {
      const index = inconducive.controls.findIndex(x => x.value === input.value);
      inconducive.removeAt(index);
    }
  }

  onSubmit() {
    if (this.feelingsForm.valid) {
      console.log('Form submitted successfully!');
      console.log('Form data:', this.feelingsForm.value);

      // Call the addEmoSurvey function from the EmotionService
      this.emotionService.addEmoSurvey(this.feelingsForm.value).subscribe(
        (EmoSurvey) => {
          console.log('EmoSurvey added successfully!', EmoSurvey.Timestamp);
          this.openSnackBar('Form submitted successfully!', 'Close');
        },
        (error) => {
          console.error('Error adding EmoSurvey:', error);
          this.openSnackBar(
            'Error submitting form. Please try again.',
            'Close'
          );
        }
      );
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
