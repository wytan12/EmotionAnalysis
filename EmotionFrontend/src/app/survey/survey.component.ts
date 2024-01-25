import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router module

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  
  constructor(private router: Router) { }

  navigate() {
    this.router.navigate(['negative-bar']);
  }
}


