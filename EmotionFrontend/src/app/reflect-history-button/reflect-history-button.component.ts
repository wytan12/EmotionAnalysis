import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'app-reflect-history-button',
  templateUrl: './reflect-history-button.component.html',
  styleUrl: './reflect-history-button.component.css'
})
export class ReflectHistoryButtonComponent {
  constructor(
    private router: Router,
    private communityService: CommunityService
  ) { }

  goToReflectForm() {
    // Navigate while preserving community context
    this.communityService.navigateInCommunity('reflect-history');
  }
}
