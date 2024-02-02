import { Component } from '@angular/core';
import { SharedViewService } from '../shared-view.service';

@Component({
  selector: 'app-select-view-dropdown',
  templateUrl: './select-view-dropdown.component.html',
  styleUrl: './select-view-dropdown.component.css'
})
export class SelectViewDropdownComponent {
  public selectedView : string | null;

  constructor(private sharedViewService : SharedViewService) {
    this.selectedView = null; // or initialize with any other default value as needed
  }

  onChange(selectedView: string | null): void {
    this.sharedViewService.selectedView = selectedView;
  }
}
