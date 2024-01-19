import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedTimeService {

  private selectedTimeSubject = new BehaviorSubject<string[]>([]);
  selectedTime$ = this.selectedTimeSubject.asObservable();

  setSelectedTime(startDate: Date, endDate: Date) {
    const startTimestamp = startDate.toISOString(); // Convert to ISO string
    const endTimestamp = endDate.toISOString(); // Convert to ISO string
    console.log("Start:", startTimestamp);
    console.log("End:", endTimestamp);

    const timestampRange = [startTimestamp, endTimestamp];
    
    this.selectedTimeSubject.next(timestampRange);
    console.log("Timestamp Range:", timestampRange);
  }

  constructor() { }
}
