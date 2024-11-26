import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment';
import { ExportService } from '../services/export.service';
import { API_ENDPOINTS } from '../shared/api-endpoints';

@Component({
  selector: 'app-tryingnote',
  templateUrl: './tryingnote.component.html',
  styleUrl: './tryingnote.component.css',
})
export class TryingnoteComponent {
  constructor(private router: Router, private exportService: ExportService) {}

  ngOnInit(): void {}

  helpWindow() {
    const apiUrl = API_ENDPOINTS.form;
    // Calculate the position to center the window
    const width = 1000;
    const height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    // Open the window with the calculated position
    window.open(
      apiUrl,
      '_blank',
      `location=yes,width=${width},height=${height},left=${left},top=${top},scrollbars=yes,status=yes`
    );
  }

  async exportToCsv() {
    try {
      // Call the service method to handle the CSV export
      await this.exportService.exportToCsv();
    } catch (error) {
      console.error('Error exporting to CSV', error);
    }
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
