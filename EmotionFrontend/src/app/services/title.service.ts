import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  // private titleSource = new BehaviorSubject<string>('');
  private titleSource : BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  // title$ = this.titleSource.asObservable();

  private labelSource: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() { }

  // private title: string = '';

  // setTitle(title: string) {
  //   this.title = title;
  //   console.log('Title set:', this.title);
  // }

  // getTitle(): Observable<string> {
  //   return this.title$;
  // }

  public get selectedTitle$(): Observable<string | null> {
    return this.titleSource.asObservable();
  }

  public set selectedTitle(title: string | null) {
    this.titleSource.next(title);
  }

  public get selectedLabel$(): Observable<string | null> {
    return this.labelSource.asObservable();
  }

  public set selectedLabel(title: string | null) {
    this.labelSource.next(title);
  }


}
