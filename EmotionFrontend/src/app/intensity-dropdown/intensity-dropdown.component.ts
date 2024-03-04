import { Component, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intensity-dropdown',
  templateUrl: './intensity-dropdown.component.html',
  styleUrl: './intensity-dropdown.component.css'
})
export class IntensityDropdownComponent {
  @Output() selectedValueChange = new EventEmitter<string>();
  selectedValue: string = 'Sort by'; // default value

  selectValue(value: string): void {
    this.selectedValue = value;
    this.selectedValueChange.emit(value);
  }

}
