import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router module
import { ExportService } from '../services/export.service';
import { NoteVisibilityService } from '../note-visibility.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  isVisible = false;
  
  constructor(private router: Router, private exportService: ExportService,
    private visibilityService: NoteVisibilityService) { }

  ngOnInit() {
    this.visibilityService.getVisibilityObservable('SurveyNote').subscribe(visible => {
      this.isVisible = visible;
    });
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

  navigate() {
    this.router.navigate(['inconducive-chart']);
  }

  closeSurveyNote(): void {
    this.visibilityService.setVisibility('SurveyNote', false);
  }
}

// closeSurveyNote() {
//   this.showScrollSpy = false;
// }


