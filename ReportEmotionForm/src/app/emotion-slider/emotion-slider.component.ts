import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emotion-slider',
  templateUrl: './emotion-slider.component.html',
  styleUrl: './emotion-slider.component.css'
})
export class EmotionSliderComponent {
  feelingsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.feelingsForm = this.formBuilder.group({
      joyful: ['', Validators.required],
      curious: ['', Validators.required],
      surprised: ['', Validators.required],
      confused: ['', Validators.required],
      anxious: ['', Validators.required],
      frustrated: ['', Validators.required],
      bored: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.feelingsForm.valid) {
      console.log('Form submitted successfully!');
      console.log('Form data:', this.feelingsForm.value);
    } else {
      console.log('Please answer all compulsory questions.');
    }
  }
}
