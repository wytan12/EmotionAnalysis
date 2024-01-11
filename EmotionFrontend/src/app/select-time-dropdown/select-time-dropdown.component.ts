import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-time-dropdown',
  templateUrl: './select-time-dropdown.component.html',
  styleUrl: './select-time-dropdown.component.css'
})
export class SelectTimeDropdownComponent {
  rotateDegrees = 0;

  constructor() {

  }

  ngOnInit() {
  }

  onToggle(event: any) {
    console.log(event);
    this.rotateDegrees = event ? 180 : 0;
  }
}
