import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  template: `<p>Redirecting to dashboard...</p>`,
})
export class RedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const communityId =
      this.route.snapshot.queryParamMap.get('communityId') ||
      this.route.snapshot.paramMap.get('communityId');

    const token = this.route.snapshot.queryParamMap.get('access_token');

    if (token) {
      localStorage.setItem('access_token', token);
    }

    if (communityId) {
      this.router.navigate(['/tryingnote', communityId]);
    } else {
      this.router.navigate(['/tryingnote/6645ab836782b352b64ea86c']);
    }
  }
}
