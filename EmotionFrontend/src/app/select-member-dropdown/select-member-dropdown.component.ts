import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-select-member-dropdown',
  templateUrl: './select-member-dropdown.component.html',
  styleUrl: './select-member-dropdown.component.css',
})
export class SelectMemberDropdownComponent {

  randomUserUrl = 'https://api.randomuser.me/?results=5';
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  isLoading = false;

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const getRandomNameList = (name: string): Observable<any> =>
      this.http
        .get(`${this.randomUserUrl}`)
        .pipe(
          catchError(() => of({ results: [] })),
          map((res: any) => res.results)
        )
        .pipe(map((list: any) => list.map((item: any) => `${item.name.first} ${name}`)));
    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });
  }
}
