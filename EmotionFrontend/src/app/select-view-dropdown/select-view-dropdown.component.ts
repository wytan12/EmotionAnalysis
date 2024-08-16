import { Component, OnInit } from '@angular/core';
import { SharedViewService } from '../shared-view.service';

@Component({
  selector: 'app-select-view-dropdown',
  templateUrl: './select-view-dropdown.component.html',
  styleUrl: './select-view-dropdown.component.css',
})
export class SelectViewDropdownComponent implements OnInit {
  public selectedView: string | null = null;
  public views: string[] = [];

  constructor(private sharedViewService: SharedViewService) {}

  ngOnInit() {
    this.sharedViewService.getViews().subscribe((views: string[]) => {
      this.views = views;
      if (views.length > 0) {
        this.selectedView = views.join(', '); // Optionally set the first view as default
        this.onChange(this.selectedView);
      }
    });
  }

  onChange(selectedView: string | null): void {
    this.sharedViewService.selectedView = selectedView;
    console.log(selectedView);
  }
}
