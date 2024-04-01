import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmotionService } from '../services/emotion.service';
import { EmoSurvey } from '../services/emotion';

@Component({
  selector: 'app-emotion-slider',
  templateUrl: './emotion-slider.component.html',
  styleUrl: './emotion-slider.component.css'
})
export class EmotionSliderComponent implements OnInit {

  feelingsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private emotionService: EmotionService // Inject your EmotionService here
  ) { }

  ngOnInit(): void {
    this.feelingsForm = this.formBuilder.group({
      Joyful: ['', Validators.required],
      Curious: ['', Validators.required],
      Surprised: ['', Validators.required],
      Confused: ['', Validators.required],
      Anxious: ['', Validators.required],
      Frustrated: ['', Validators.required],
      Bored: ['', Validators.required],
      Inconducive: ['', Validators.required],
      Reason: ['', Validators.required],
      Remarks: [''],
    });
  }

  onSubmit() {
    if (this.feelingsForm.valid) {
      console.log('Form submitted successfully!');
      console.log('Form data:', this.feelingsForm.value);

      // Call the addEmoSurvey function from the EmotionService
      this.emotionService.addEmoSurvey(this.feelingsForm.value).subscribe(EmoSurvey => {
        console.log('EmoSurvey added successfully!', EmoSurvey.Timestamp);
      });
      //   (response: EmoSurvey) => {
      //     console.log('EmoSurvey added successfully!', response);
      //   },
      //   (error) => {
      //     console.error('Error adding EmoSurvey:', error);
      //   }
      // );
    } else {
      console.log('Please answer all compulsory questions.');
    }
  }
}
