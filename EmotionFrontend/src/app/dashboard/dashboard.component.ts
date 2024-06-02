import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  helpWindow() {
    // Calculate the position to center the window
    const width = 1000;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // Open the window with the calculated position
    window.open(
      environment.apiUrl,
      '_blank',
      `location=yes,width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=yes`
    );
  }
}
