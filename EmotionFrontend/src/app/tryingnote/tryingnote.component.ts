import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment';
import { ExportService } from '../services/export.service';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tryingnote',
  templateUrl: './tryingnote.component.html',
  styleUrl: './tryingnote.component.css',
})
export class TryingnoteComponent {
  communityId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute, // ✅ Inject ActivatedRoute
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    // ✅ Extract communityId from the route parameter
    this.communityId = this.route.snapshot.paramMap.get('communityId') || '';
    console.log('Loaded communityId:', this.communityId);

    // If needed: pass communityId to a service or fetch data
    // this.myService.fetchCommunityData(this.communityId).subscribe(...)
  }

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

  async exportSurveyToCsv() {
    try {
      // Call the service method to handle the CSV export
      await this.exportService.exportSurveyJson();
    } catch (error) {
      console.error('Error exporting Survey', error);
    }
  }
}
