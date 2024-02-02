import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedViewService {
  private selectedViewSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() { }

  public get selectedView$(): Observable<string | null> {
    return this.selectedViewSubject.asObservable();
  }

  public set selectedView(value: string | null) {
    this.selectedViewSubject.next(value);
  }
}