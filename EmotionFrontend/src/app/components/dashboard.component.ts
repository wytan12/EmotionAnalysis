import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div>
      <h1>Dashboard</h1>
      
      <div *ngIf="!authService.isAuthenticated()">
        <p>Not authenticated. Please log in.</p>
      </div>
      
      <div *ngIf="authService.isAuthenticated()">
        <button (click)="getUserInfo()">Get User Info</button>
        <button (click)="getCommunityData()">Get Community Data</button>
        
        <div *ngIf="userInfo">
          <h3>User Info:</h3>
          <pre>{{ userInfo | json }}</pre>
        </div>
        
        <div *ngIf="communityData">
          <h3>Community Data:</h3>
          <pre>{{ communityData | json }}</pre>
        </div>
        
        <div *ngIf="error">
          <h3>Error:</h3>
          <pre>{{ error | json }}</pre>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  userInfo: any = null;
  communityData: any = null;
  error: any = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Automatically initialize session if token exists
    if (this.authService.isAuthenticated()) {
      this.authService.initializeSession().subscribe({
        next: (response) => {
          console.log('Session initialized on dashboard load:', response);
        },
        error: (error) => {
          console.error('Failed to initialize session:', error);
        }
      });
    }
  }

  getUserInfo(): void {
    this.error = null;
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.userInfo = data;
        console.log('User info received:', data);
      },
      error: (error) => {
        this.error = error;
        console.error('Error getting user info:', error);
      }
    });
  }

  getCommunityData(): void {
    this.error = null;
    this.authService.getCommunityData('6645ab836782b352b64ea86c').subscribe({
      next: (data) => {
        this.communityData = data;
        console.log('Community data received:', data);
      },
      error: (error) => {
        this.error = error;
        console.error('Error getting community data:', error);
      }
    });
  }
}
