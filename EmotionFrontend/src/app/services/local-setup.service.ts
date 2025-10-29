import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CommunityService } from './community.service';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class LocalSetupService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private communityService: CommunityService
  ) {}

  /**
   * Initialize local development environment with token and community setup
   */
  async initializeLocalEnvironment(): Promise<boolean> {
    try {
      console.log(
        '[LOCAL-SETUP] Initializing local development environment...'
      );

      // Check if we should use local token setup
      if (!environment.localDev.useLocalToken) {
        console.log(
          '[LOCAL-SETUP] Local token setup disabled, using normal flow'
        );
        return false;
      }

      // Try to get token from backend test-auth endpoint
      const token = await this.authenticateWithBackend();

      if (token) {
        console.log('[LOCAL-SETUP] Token obtained successfully');

        // Store token
        this.authService.setToken(token);

        // Set community ID
        this.communityService.setCommunityId(environment.localDev.communityId);

        console.log('[LOCAL-SETUP] Local environment initialized successfully');
        return true;
      } else {
        console.warn('[LOCAL-SETUP] Failed to obtain token from backend');
        return false;
      }
    } catch (error) {
      console.error(
        '[LOCAL-SETUP] Error initializing local environment:',
        error
      );
      return false;
    }
  }

  /**
   * Authenticate with backend using RDC credentials
   */
  private async authenticateWithBackend(): Promise<string | null> {
    try {
      const response = (await this.http
        .get(`${environment.apiUrl}/test-auth`, {
          withCredentials: true,
        })
        .toPromise()) as any;

      if (response && response.token) {
        return response.token;
      } else {
        console.error('[LOCAL-SETUP] No token in backend response:', response);
        return null;
      }
    } catch (error) {
      console.error('[LOCAL-SETUP] Backend authentication failed:', error);
      return null;
    }
  }

  /**
   * Check if local environment is properly set up
   */
  isLocalEnvironmentReady(): boolean {
    const hasToken = !!this.authService.getToken();
    const hasCommunityId = !!this.communityService.getCurrentCommunityId();

    return hasToken && hasCommunityId;
  }

  /**
   * Reset local environment (clear tokens, etc.)
   */
  resetLocalEnvironment(): void {
    this.authService.removeToken();
    this.communityService.clearCommunityId();
    console.log('[LOCAL-SETUP] Local environment reset');
  }

  /**
   * Get current setup status
   */
  getSetupStatus(): {
    hasToken: boolean;
    hasCommunityId: boolean;
    communityId: string | null;
  } {
    return {
      hasToken: !!this.authService.getToken(),
      hasCommunityId: !!this.communityService.getCurrentCommunityId(),
      communityId: this.communityService.getCurrentCommunityId(),
    };
  }
}
