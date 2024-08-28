import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedViewService {
  private selectedViewSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  public get selectedView$(): Observable<string | null> {
    return this.selectedViewSubject.asObservable();
  }

  set selectedView(view: string | null) {
    this.selectedViewSubject.next(view);
  }

  getViews(): Observable<string[]> {
    return this.http
      .get<any[]>('http://localhost:3000/api/community-data')
      .pipe(
        map((data) => {
          const viewsSet = new Set<string>();
          data.forEach((entry) => {
            entry.inViews.forEach((view: any) => {
              viewsSet.add(view.title);
            });
          });
          return Array.from(viewsSet);
        })
      );
  }
}
