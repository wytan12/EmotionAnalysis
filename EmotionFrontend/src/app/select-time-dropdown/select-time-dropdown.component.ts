import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTimeService } from '../services/shared-time.service';
import {FormGroup, FormControl} from '@angular/forms';
import {EmotionService} from "../services/emotion.service";
import {TimeService} from "../services/time.service";

@Component({
  selector: 'app-select-time-dropdown',
  templateUrl: './select-time-dropdown.component.html',
  styleUrl: './select-time-dropdown.component.css'
})
export class SelectTimeDropdownComponent {
  constructor(private timeService: TimeService, private sharedTimeService: SharedTimeService) {}

  ngOnInit() {
    this.range.valueChanges.subscribe(value => {
      console.log('Value changed:', value);
    });
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  date = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);

    // Define default range (10 years ago to today) if result is undefined or incomplete
    const defaultFrom = new Date();
    defaultFrom.setFullYear(defaultFrom.getFullYear() - 10); // 10 years ago
    const from = result[0] ? this.timeService.convertToTimeStamp(result[0]) : this.timeService.convertToTimeStamp(defaultFrom);
    const to = result[1] ? this.timeService.convertToTimeStamp(result[1]) : this.timeService.convertToTimeStamp(new Date());

    console.log('From number:', from);
    console.log('From:', this.timeService.convertToDate(from));
    console.log('To number:', to);
    console.log('To:', this.timeService.convertToDate(to));

    // Set the selected time range if both dates are present or using default range
    this.sharedTimeService.setSelectedTime(from, to);
  }
}