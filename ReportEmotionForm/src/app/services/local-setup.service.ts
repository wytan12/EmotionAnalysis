import { Injectable } from '@angular/core';
import { CommunityService } from './community.service';

@Injectable({
  providedIn: 'root',
})
export class LocalSetupService {
  constructor(private communityService: CommunityService) {}

  // Initialize local development setup
  initializeLocalSetup(): void {
    // Set the same community ID as used by EmotionFrontend for consistency
    const defaultCommunityId = '6645ab836782b352b64ea86c';

    // Only set if no community ID is already set (to avoid overriding production redirects)
    if (!this.communityService.getCurrentCommunityId()) {
      console.log(
        '[LOCAL-SETUP] Setting default community ID for local development:',
        defaultCommunityId
      );
      this.communityService.setCommunityId(defaultCommunityId);
    }
  }
}
