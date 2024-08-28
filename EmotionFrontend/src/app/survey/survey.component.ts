import { Component, OnInit, Input,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router module
import { ExportService } from '../services/export.service';
import { NoteVisibilityService } from '../note-visibility.service';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  isVisible = false;
  
  constructor(private router: Router, private exportService: ExportService,
    private visibilityService: NoteVisibilityService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.visibilityService.getVisibilityObservable('SurveyNote').pipe(
      startWith(false) // Ensure the observable starts with false
    ).subscribe(visible => {
      console.log('Visibility:', visible);
      this.isVisible = visible;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
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


