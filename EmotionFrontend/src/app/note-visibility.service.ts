import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteVisibilityService {
  private visibilitySubjects: { [key: string]: BehaviorSubject<boolean> } = {};

  getVisibilityObservable(noteId: string) {
    if (!this.visibilitySubjects[noteId]) {
      this.visibilitySubjects[noteId] = new BehaviorSubject<boolean>(true);
    }
    return this.visibilitySubjects[noteId].asObservable();
  }

  setVisibility(noteId: string, visible: boolean): void {
    if (!this.visibilitySubjects[noteId]) {
      this.visibilitySubjects[noteId] = new BehaviorSubject<boolean>(true);
    }
    this.visibilitySubjects[noteId].next(visible);
  }
}
