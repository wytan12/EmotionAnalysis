import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'app-reflect-button',
  templateUrl: './reflect-button.component.html',
  styleUrl: './reflect-button.component.css'
})
export class ReflectButtonComponent {

  constructor(
    private router: Router,
    private communityService: CommunityService
  ) { }

  goToReflectForm() {
    // Navigate while preserving community context
    this.communityService.navigateInCommunity('reflect-form');
  }
}
