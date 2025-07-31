// src/app/services/export.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { CommunityService } from './community.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private baseUrl = API_ENDPOINTS.base;

  constructor(
    private http: HttpClient,
    private communityService: CommunityService
  ) {}

  async exportToCsv() {
    try {
      const communityId = this.communityService.getCurrentCommunityId();
      if (!communityId) {
        console.error('No community ID available for export');
        return;
      }
      
      // Fetch JSON data for the current community
      const data = await this.http.get<any[]>(`${API_ENDPOINTS.communityData}/${communityId}`).toPromise();
      // Convert JSON data to string
      const jsonData = JSON.stringify(data, null, 2); // Pretty print with indentation
      // Trigger download
      this.downloadJson(jsonData, 'note-emotion.json');
    } catch (error) {
      console.error('Error exporting to JSON', error);
    }
  }

  private downloadJson(jsonData: string, filename: string) {
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  async exportSurveyJson() {
    try {
      const communityId = this.communityService.getCurrentCommunityId();
      if (!communityId) {
        console.error('No community ID available for survey export');
        return;
      }
      
      // Use community-specific endpoint for survey data
      const data = await this.http.get<any[]>(`${API_ENDPOINTS.findAllEmoSurvey}/${communityId}`).toPromise();
      const jsonData = JSON.stringify(data, null, 2);
      this.downloadJson(jsonData, 'emo-survey.json');
    } catch (error) {
      console.error('Failed to export survey JSON', error);
    }
  }
}

function replacer(key: string, value: any): any {
  return value === null ? '' : value.toString().replace(/"/g, '""');
}