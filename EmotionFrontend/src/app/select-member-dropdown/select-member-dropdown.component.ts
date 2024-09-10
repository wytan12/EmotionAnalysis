import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter , Output} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-select-member-dropdown',
  templateUrl: './select-member-dropdown.component.html',
  styleUrl: './select-member-dropdown.component.css',
})
export class SelectMemberDropdownComponent {
  @Output() userSelected = new EventEmitter<string[]>();
  selectedUserText = ''; // This will bind to the text input

  constructor() {}

  onUserTextChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      const selectedUserArray = inputElement.value.split(',').map(name => name.trim());
      this.userSelected.emit(selectedUserArray);
    }
  }  
}
