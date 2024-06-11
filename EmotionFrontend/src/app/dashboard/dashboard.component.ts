import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment';
import { ExportService } from '../services/export.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, 
              private exportService: ExportService) {}

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

  exportToCsv() {
    this.exportService.exportToCsv().subscribe((data) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  exportSurveyToCsv() {
    this.exportService.exportSurveyToCsv().subscribe((data) => {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'survey_data.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
