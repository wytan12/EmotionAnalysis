import { Injectable } from '@angular/core';
import { CommunityService } from './community.service';

@Injectable({
  providedIn: 'root',
})
export class LocalSetupService {
  constructor(private communityService: CommunityService) {}

  // Initialize local development setup
  initializeLocalSetup(): void {
    // Set a default community ID for local development
    const defaultCommunityId = 'test-community-001';

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
