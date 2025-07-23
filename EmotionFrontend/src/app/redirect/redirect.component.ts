import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-redirect',
  template: `
    <div>
      <p>Processing authentication...</p>
      <p *ngIf="status">{{ status }}</p>
    </div>
  `,
})
export class RedirectComponent implements OnInit {
  status: string = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const communityId = this.route.snapshot.paramMap.get('communityId');
    const token = this.route.snapshot.queryParamMap.get('access_token');

    console.log('Processing redirect with communityId:', communityId);
    console.log('Access token:', token ? 'Present' : 'Missing');

    if (token) {
      this.status = 'Storing authentication token...';
      
      // Store token in localStorage for frontend use
      this.authService.setToken(token);
      
      this.status = 'Authentication successful! Redirecting...';
      
      // Since we came from backend redirect, the session should already be set
      // No need to call initializeSession again - just navigate
      setTimeout(() => {
        this.navigateToDestination(communityId);
      }, 1000);
      
    } else {
      this.status = 'No authentication token found. Please try logging in again.';
      console.warn('No token found in redirect URL');
      
      // Navigate anyway, but user might need to login
      setTimeout(() => {
        this.navigateToDestination(communityId);
      }, 2000);
    }
  }

  private navigateToDestination(communityId: string | null): void {
    if (communityId) {
      this.router.navigate(['/tryingnote', communityId]);
    } else {
      this.router.navigate(['/tryingnote/6645ab836782b352b64ea86c']);
    }
  }
}
