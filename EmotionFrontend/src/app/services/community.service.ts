import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private currentCommunityIdSubject = new BehaviorSubject<string | null>(null);
  public currentCommunityId$ = this.currentCommunityIdSubject.asObservable();

  constructor(private router: Router) {}

  // Set the current community ID
  setCommunityId(communityId: string): void {
    this.currentCommunityIdSubject.next(communityId);
    console.log('[COMMUNITY] Set community ID:', communityId);
  }

  // Get the current community ID
  getCurrentCommunityId(): string | null {
    return this.currentCommunityIdSubject.value;
  }

  // Navigate to a route while preserving the community ID
  navigateWithCommunity(route: string[], queryParams?: any): void {
    const communityId = this.getCurrentCommunityId();
    
    if (!communityId) {
      console.error('[COMMUNITY] No community ID set for navigation');
      return;
    }

    // Replace any route parameters that need community ID
    const updatedRoute = route.map(segment => {
      if (typeof segment === 'string' && segment.includes(':communityId')) {
        return segment.replace(':communityId', communityId);
      }
      return segment;
    });

    this.router.navigate(updatedRoute, { queryParams });
  }

  // Navigate to tryingnote with current community
  navigateToTryingnote(): void {
    const communityId = this.getCurrentCommunityId();
    if (communityId) {
      this.router.navigate(['/tryingnote', communityId]);
    } else {
      console.error('[COMMUNITY] Cannot navigate to tryingnote: no community ID set');
    }
  }

  // Navigate to any page while maintaining the community context
  navigateInCommunity(path: string): void {
    const communityId = this.getCurrentCommunityId();
    if (communityId) {
      this.router.navigate([path], { 
        queryParams: { communityId: communityId }
      });
    } else {
      console.error('[COMMUNITY] Cannot navigate: no community ID set');
      this.router.navigate([path]);
    }
  }

  // Clear the community ID (for logout, etc.)
  clearCommunityId(): void {
    this.currentCommunityIdSubject.next(null);
    console.log('[COMMUNITY] Cleared community ID');
  }
}
