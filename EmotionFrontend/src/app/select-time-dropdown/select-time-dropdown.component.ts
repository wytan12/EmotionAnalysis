import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-time-dropdown',
  templateUrl: './select-time-dropdown.component.html',
  styleUrl: './select-time-dropdown.component.css'
})
export class SelectTimeDropdownComponent {
  value = [new Date('2024/01/01'), new Date('2024/01/10')];

  constructor() {

  }

  ngOnInit() {
  }

  onChange(dateList:any) {
    console.log(dateList);
  }
}
