import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedTimeService {

  private selectedTimeSubject = new BehaviorSubject<number[]>([]);
  selectedTime$ = this.selectedTimeSubject.asObservable();

  setSelectedTime(startDate: number, endDate: number) {
    console.log("Start:", startDate);
    console.log("End:", endDate);

    const timestampRange = [startDate, endDate];
    
    this.selectedTimeSubject.next(timestampRange);
  }

  constructor() { }
}
