import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTimeService } from '../shared-time.service';
import {FormGroup, FormControl} from '@angular/forms';
import {EmotionService} from "../services/emotion.service";
import {TimeService} from "../services/time.service";

@Component({
  selector: 'app-select-time-dropdown',
  templateUrl: './select-time-dropdown.component.html',
  styleUrl: './select-time-dropdown.component.css'
})
export class SelectTimeDropdownComponent {
  constructor(private timeService: TimeService) {
  }
  ngOnInit() {
    this.range.valueChanges.subscribe(
      value => {console.log('Value changed:', value);
    });
  }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  date = null;
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    const from = this.timeService.convertToTimeStamp(result[0]);
    const to = this.timeService.convertToTimeStamp(result[1]);
    console.log(from);
    console.log(this.timeService.convertToDate(from));
    console.log(to);
    console.log(this.timeService.convertToDate(to));
  }




}
