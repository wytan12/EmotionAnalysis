import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intensity-dropdown',
  templateUrl: './intensity-dropdown.component.html',
  styleUrl: './intensity-dropdown.component.css'
})
export class IntensityDropdownComponent {
  selectedValue: string = 'Select an option'; // default value

}
