import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    console.log('[FORM] Form component initialized');
    
    // Check for communityId in route parameters
    const communityId = this.route.snapshot.paramMap.get('communityId');
    console.log('[FORM] Community ID from route params:', communityId);

    if (communityId) {
      console.log('[FORM] Setting community ID from URL:', communityId);
      this.communityService.setCommunityId(communityId);
    } else {
      // Check for communityId in query parameters as fallback
      this.route.queryParams.subscribe((params: Params) => {
        const queryCommunityId = params['communityId'];
        console.log('[FORM] Community ID from query params:', queryCommunityId);
        
        if (queryCommunityId) {
          console.log(
            '[FORM] Setting community ID from query params:',
            queryCommunityId
          );
          this.communityService.setCommunityId(queryCommunityId);
        } else {
          // For local development, the LocalSetupService will set a default community ID
          console.log(
            '[FORM] No community ID found in URL parameters. Local development mode will use default community ID.'
          );
        }
      });
    }
    
    // Log final community ID after initialization
    setTimeout(() => {
      const finalCommunityId = this.communityService.getCurrentCommunityId();
      console.log('[FORM] Final community ID after initialization:', finalCommunityId);
    }, 100);
  }

  protected onSubmit() {
    alert(
      'Form Submitted succesfully!!!\n Check the values in browser console.'
    );
  }
}
