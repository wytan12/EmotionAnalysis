import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'app-report-emotion-button',
  templateUrl: './report-emotion-button.component.html',
  styleUrl: './report-emotion-button.component.css',
})
export class ReportEmotionButtonComponent {
  constructor(private communityService: CommunityService) {}

  openForm(): void {
    const communityId = this.communityService.getCurrentCommunityId();
    console.log('[BUTTON] Opening form with community ID:', communityId);

    // Get the access token from localStorage to ensure popup has it
    const token = localStorage.getItem('access_token');
    console.log('[BUTTON] Token available:', token ? 'Yes' : 'No');

    // Construct the full URL to the form
    // IMPORTANT: Use the correct origin that goes through nginx (port 80), not the frontend service directly (port 4200)
    // In production: window.location.origin works fine
    // In local development: need to use localhost (nginx port) not localhost:4200 (frontend port)
    const currentOrigin = window.location.origin;
    const origin = currentOrigin.includes(':4200')
      ? 'http://localhost' // Use nginx proxy port (80) instead of frontend port (4200)
      : currentOrigin;

    // Use query parameter format which is compatible with the form component
    // The form reads both query params and path params
    const formUrl = communityId
      ? `${origin}/form/?communityId=${communityId}`
      : `${origin}/form/`;

    console.log('[BUTTON] Current origin:', currentOrigin);
    console.log('[BUTTON] Using origin for form:', origin);
    console.log('[BUTTON] Form URL to open:', formUrl);

    // Calculate the position to center the window
    const width = 1000;
    const height = 700;
    const left = Math.max(0, (window.innerWidth - width) / 2);
    const top = Math.max(0, (window.innerHeight - height) / 2);

    console.log('[BUTTON] Opening popup at position:', {
      left,
      top,
      width,
      height,
    });

    // Open the window with the calculated position
    const popup = window.open(
      formUrl,
      'emotionSurveyForm',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes,status=yes`
    );

    if (popup) {
      // Wait for popup to load, then ensure it has the token
      // Since both windows are same-origin, they share localStorage automatically
      // But we can also set it explicitly to be sure
      popup.onload = () => {
        console.log('[BUTTON] Popup loaded, checking token availability');
        if (token && popup.localStorage) {
          popup.localStorage.setItem('access_token', token);
          console.log('[BUTTON] Token set in popup window');
        }
      };

      popup.focus();
      console.log('[BUTTON] Popup opened successfully');
    } else {
      console.error(
        '[BUTTON] Failed to open popup - might be blocked by browser'
      );
      alert('Please allow popups for this site to submit the survey');
    }
  }
}
