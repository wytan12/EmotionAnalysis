// src/app/services/export.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  exportToCsv() {
    return this.http.get(`${this.baseUrl}/export/csv`, {
      responseType: 'text',
    });
  }

  exportSurveyToCsv() {
    return this.http.get(`${this.baseUrl}/export/survey/csv`, {
      responseType: 'text',
    });
  }
  
}
