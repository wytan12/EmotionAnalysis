import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  activePage: string = ''; // Initialize with a default value

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.setActivePage();
    });
  }
  
  // Function to set the activePage variable based on the current route
  setActivePage() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('dashboard')) {
      this.activePage = 'dashboard';
    } else if (currentRoute.includes('survey') || currentRoute.includes('inconducive')) {
      this.activePage = 'survey';
    } else if (currentRoute.includes('tryingnote')) {
      this.activePage = 'tryingnote';
    } else {
      this.activePage = ''; // Handle other cases or set a default value
    }
  }
  
  goToHome() {
    this.router.navigate(['dashboard']);
  }

  goToSurvey() {
    this.router.navigate(['survey']);
  }

  goToTryingnote() {
    this.router.navigate(['tryingnote']);
  }
}
