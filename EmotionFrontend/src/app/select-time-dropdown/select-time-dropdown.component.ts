import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTimeService } from '../shared-time.service';

@Component({
  selector: 'app-select-time-dropdown',
  templateUrl: './select-time-dropdown.component.html',
  styleUrl: './select-time-dropdown.component.css'
})
export class SelectTimeDropdownComponent {
  value = [new Date('2024/01/01'), new Date('2024/01/10')];

  constructor(private sharedTimeService: SharedTimeService) {}

  ngOnInit() {}

  onSelectTime(dateList:any) {
    // Assuming timeRange is an object containing start and end dates
    console.log('Selected Time Range:', dateList);

    // Pass the formatted dates to the shared service
    this.sharedTimeService.setSelectedTime(dateList[0], dateList[1]);
  }

  onChange(dateList: any) {
    console.log(dateList[0]);
  }
}
