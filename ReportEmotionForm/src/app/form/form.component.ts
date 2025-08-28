import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    // Check for communityId in route parameters
    const communityId = this.route.snapshot.paramMap.get('communityId');
    
    if (communityId) {
      console.log('Setting community ID from URL:', communityId);
      this.communityService.setCommunityId(communityId);
    } else {
      // Check for communityId in query parameters as fallback
      this.route.queryParams.subscribe((params: Params) => {
        const queryCommunityId = params['communityId'];
        if (queryCommunityId) {
          console.log('Setting community ID from query params:', queryCommunityId);
          this.communityService.setCommunityId(queryCommunityId);
        } else {
          console.warn('No community ID found in URL parameters. Survey may not be associated with a community.');
        }
      });
    }
  }

  protected onSubmit() {
    alert(
      "Form Submitted succesfully!!!\n Check the values in browser console."
    );
  }
}
