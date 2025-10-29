import { Component, OnInit } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { CommunityService } from './services/community.service';
import { environment } from '../environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private communityService: CommunityService
  ) { };
  title = 'Emotions';
  
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
        console.log('[APP] Setting default community ID for local development');
        this.communityService.setCommunityId(environment.localDev.communityId);
      } else {
        console.log('[APP] Community ID already set:', currentCommunityId);
      }
    }
  }
}
