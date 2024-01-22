import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-reason',
  templateUrl: './survey-reason.component.html',
  styleUrl: './survey-reason.component.css'
})
export class SurveyReasonComponent {
  constructor(private router: Router) {
    // Your constructor logic here
  }
}
