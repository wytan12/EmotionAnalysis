import { Component, Input } from '@angular/core';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { ThemePalette } from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';
import { NoteVisibilityService } from '../services/note-visibility.service';
import { TitleService } from '../services/title.service';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent {
  @Input() backgroundColor: ThemePalette;
  isVisible = false;

  constructor(
    private visibilityService: NoteVisibilityService,
    private titleService: TitleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.visibilityService
      .getVisibilityObservable('SurveyNote')
      .pipe(startWith(false))
      .subscribe((visible) => {
        console.log('Visibility:', visible);
        this.isVisible = visible;
        this.cdr.detectChanges();
      });
  }

  // Function to handle tab changes
  onTabChange(event: MatTabChangeEvent) {
    console.log('Tab change event:', event.index);
    if (event.index === 0) {
      // Check if the "Overall Emotions" tab is selected (first tab)
      // Keep survey visible for overall emotions
      this.visibilityService.setVisibility('SurveyNote', true);
      this.titleService.selectedTitle = null; // Clear the selected title to show all surveys
      this.isVisible = true;
    } else if (event.index === 1) {
      // Inconducive Emotions tab
      // Hide survey for inconducive emotions (it will be shown when clicking on chart)
      this.visibilityService.setVisibility('SurveyNote', false);
      this.titleService.selectedTitle = null;
      this.isVisible = false;
    }
    console.log('Visibility:', this.isVisible);
    this.cdr.detectChanges(); // Ensure change detection is updated
  }
}
