import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedTimeService } from '../shared-time.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-select-time-dropdown',
  templateUrl: './select-time-dropdown.component.html',
  styleUrl: './select-time-dropdown.component.css'
})
export class SelectTimeDropdownComponent {
  ngOnInit() {
    this.range.valueChanges.subscribe(
      value => {console.log('Value changed:', value);
    });
  }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

}
