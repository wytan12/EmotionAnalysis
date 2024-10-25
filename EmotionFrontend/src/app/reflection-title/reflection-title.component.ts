import { Component, EventEmitter , Output} from '@angular/core';

@Component({
  selector: 'app-reflection-title',
  templateUrl: './reflection-title.component.html',
  styleUrl: './reflection-title.component.css'
})
export class ReflectionTitleComponent {
  @Output() titleSelected = new EventEmitter<string>();
  selectedUserText = ''; // This will bind to the text input

  constructor() {}

  onUserTextChanged(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const enteredTitle = inputElement.value.trim();
      // Emit the title string as the user enters or changes it
      this.titleSelected.emit(enteredTitle);
    }
  } 
}
