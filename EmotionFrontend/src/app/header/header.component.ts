import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) { }
  
  goToHome() {
    this.router.navigate(['home']);
  }

  goToSurvey() {
    this.router.navigate(['survey']);
  }
}
