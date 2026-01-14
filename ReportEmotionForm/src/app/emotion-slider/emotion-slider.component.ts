import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      Joyful: [0, [Validators.required, Validators.min(1)]],
      Curious: [0, [Validators.required, Validators.min(1)]],
      Surprised: [0, [Validators.required, Validators.min(1)]],
      Confused: [0, [Validators.required, Validators.min(1)]],
      Anxious: [0, [Validators.required, Validators.min(1)]],
      Frustrated: [0, [Validators.required, Validators.min(1)]],
      Bored: [0, [Validators.required, Validators.min(1)]],
      Inconducive: this.fb.array([], [Validators.required, Validators.minLength(1)]),
      Reason: [''],
      Remarks: [''],
    });
  }

  getEmoji(id: string): string {
    switch (id) {
      case 'Joyful':
        return '😀';
      case 'Curious':
        return '😳';
      case 'Surprised':
        return '😲';
      case 'Confused':
        return '😕';
      case 'Anxious':
        return '😰';
      case 'Frustrated':
        return '😣';
      case 'Bored':
        return '🥱';
      default:
        return '';
    }
  }

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inconducive: FormArray = this.feelingsForm.get(
      'Inconducive'
    ) as FormArray;
    if (input.checked) {
      inconducive.push(new FormControl(input.value));
    } else {
      const index = inconducive.controls.findIndex(
        (control: any) => control.value === input.value
      );
      inconducive.removeAt(index);
    }
    // Mark as touched to trigger validation display
    inconducive.markAsTouched();
  }

  isInconduciveChecked(emotionId: string): boolean {
    const inconducive: FormArray = this.feelingsForm.get('Inconducive') as FormArray;
    return inconducive.controls.some((control: any) => control.value === emotionId);
  }

  onSubmit(): void {
    const communityId = this.communityService.getCurrentCommunityId();
    console.log('[EMOTION-SLIDER] Submit initiated');
    console.log(
      '[EMOTION-SLIDER] Current community ID from service:',
      communityId
    );

    if (!communityId) {
      console.error(
        '[EMOTION-SLIDER] No community ID set. Cannot submit with community context.'
      );
      this.openSnackBar(
        'Error: No community context found. Please access this form through the proper link.',
        'Close'
      );
      return;
    }

    // Add communityID to the form data for submission
    const formData = { ...this.feelingsForm.value, communityID: communityId };
    console.log('[EMOTION-SLIDER] Community ID set in form data:', communityId);
    console.log('[EMOTION-SLIDER] Full submission data:', formData);

    // Show info message for local development
    if (communityId === '6645ab836782b352b64ea86c') {
      console.log(
        '[EMOTION-SLIDER] Using default test community ID for local development'
      );
    }

    if (this.feelingsForm.valid) {
      console.log('[EMOTION-SLIDER] Form is valid, submitting...');
      console.log('[EMOTION-SLIDER] Form data:', this.feelingsForm.value);

      // Use the formData with communityID instead of patching the form
      const submissionData = {
        ...this.feelingsForm.value,
        communityID: communityId,
      };

      // Call the addEmoSurvey function from the EmotionService
      this.emotionService.addEmoSurvey(submissionData).subscribe({
        next: (EmoSurvey: any) => {
          console.log(
            '[EMOTION-SLIDER] EmoSurvey added successfully!',
            EmoSurvey.Timestamp
          );
          console.log(
            '[EMOTION-SLIDER] Survey saved with community ID:',
            communityId
          );
          this.openSnackBar('Form submitted successfully!', 'Close');
        },
        error: (error: any) => {
          console.error('[EMOTION-SLIDER] Error adding EmoSurvey:', error);
          this.openSnackBar(
            'Error submitting form. Please try again.',
            'Close'
          );
        },
      });
    } else {
      console.log('[EMOTION-SLIDER] Form is invalid - missing required fields');
      console.log('[EMOTION-SLIDER] Form errors:', this.feelingsForm.errors);
      console.log('[EMOTION-SLIDER] Form values:', this.feelingsForm.value);
      
      // Mark all fields as touched to show validation errors
      Object.keys(this.feelingsForm.controls).forEach(key => {
        this.feelingsForm.get(key)?.markAsTouched();
      });
      
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
