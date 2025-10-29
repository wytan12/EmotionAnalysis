import { Component, OnInit } from '@angular/core';
import { CommunityService } from './services/community.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Report Emotion Form';

  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    // Ensure community ID is set for local development
    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '0.0.0.0');

    if (isLocalhost) {
      // Check if community ID is already set
      const currentCommunityId = this.communityService.getCurrentCommunityId();
      
      if (!currentCommunityId) {
        console.log('[FORM-APP] Setting default community ID for local development');
        // Use the same test community ID
        this.communityService.setCommunityId('6645ab836782b352b64ea86c');
      } else {
        console.log('[FORM-APP] Community ID already set:', currentCommunityId);
      }
    }
  }
}
