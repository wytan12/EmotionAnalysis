import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteVisibilityService {
  private visibilitySubjects: { [key: string]: BehaviorSubject<boolean> } = {};

  getVisibilityObservable(note: string) {
    if (!this.visibilitySubjects[note]) {
      this.visibilitySubjects[note] = new BehaviorSubject<boolean>(false);
    }
    return this.visibilitySubjects[note].asObservable();
  }

  setVisibility(note: string, visible: boolean): void {
    if (!this.visibilitySubjects[note]) {
      this.visibilitySubjects[note] = new BehaviorSubject<boolean>(false);
    }
    this.visibilitySubjects[note].next(visible);
  }
}
