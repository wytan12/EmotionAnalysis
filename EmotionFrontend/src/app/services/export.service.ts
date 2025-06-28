// src/app/services/export.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../shared/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private baseUrl = API_ENDPOINTS.base;

  constructor(private http: HttpClient) {}

  async exportToCsv() {
    try {
      // Fetch JSON data
      const data = await this.http.get<any[]>(API_ENDPOINTS.communityData).toPromise();
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
      const data = await this.http.get<any[]>(API_ENDPOINTS.findAllEmoSurvey).toPromise();
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