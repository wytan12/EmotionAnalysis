import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../shared/api-endpoints';

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

  getViews(communityId: string): Observable<string[]> {
    const url = `${API_ENDPOINTS.communityData}/${communityId}`;
    return this.http.get<any[]>(url).pipe(
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
