import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, filter,tap } from 'rxjs/operators';

import {EmoReadWrite, Emotion, Test} from '../emotion';

import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class EmotionService {
  private EmotionesUrl = 'api/emotiones';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,

    private messageService: MessageService) { }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>("api/tests")
      .pipe(
        tap(_ => this.log('fetched Emotiones')),
        catchError(this.handleError<Test[]>('getEmotiones', []))
      );
  }

  getEmoRW(): Observable<Object[]> {
    // this.http.get("api/findAllEmoReadWrite").subscribe((response) =>{
    //     console.log("get");
    //     console.log(response);
    //   });
    return this.http.get<Object[]>("api/findAllEmoReadWrite")
      .pipe(
        tap(_ => this.log('fetched Emotiones')),
        catchError(this.handleError<Object[]>('getEmotiones', []))
      );
  }



  //   this.http.get("api/findAllEmoReadWrite").subscribe((response) =>{
  //     console.log(response);
  //   });
  //
  //   // return this.http.jsonp("api/findAllEmoReadWrite", 'callback');
  //     // .pipe(
  //     //   map(result => this.jsonpResultToHeroes(result)),
  //     //   catchError(this.handleError('searchHeroes', []))
  //     // );
  //
  //   // return this.http.jsonp<any>("api/findAllEmoReadWrite","callback")
  //   //   .subscribe(data => [console.log(data.results .map((d: any) => d.trackName));
  // }

  /** GET Emotiones from the server */
  getEmotions(): Observable<EmoReadWrite[]> {
    return this.http.get<EmoReadWrite[]>("api/findAllEmoReadWrite")
      .pipe(
        tap(_ => this.log('fetched Emotiones')),
        catchError(this.handleError<EmoReadWrite[]>('getEmotiones', []))
      );
  }

  /** GET Emotion by id. Return `undefined` when id not found */
  getEmotionNo404<Data>(id: number): Observable<Emotion> {
    const url = `${this.EmotionesUrl}/?id=${id}`;
    return this.http.get<Emotion[]>(url)
      .pipe(
        map(Emotiones => Emotiones[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} Emotion id=${id}`);
        }),
        catchError(this.handleError<Emotion>(`getEmotion id=${id}`))
      );
  }

  /** GET Emotion by id. Will 404 if id not found */
  getEmotion(id: number): Observable<Emotion> {
    const url = `${this.EmotionesUrl}/${id}`;
    return this.http.get<Emotion>(url).pipe(
      tap(_ => this.log(`fetched Emotion id=${id}`)),
      catchError(this.handleError<Emotion>(`getEmotion id=${id}`))
    );
  }

  /* GET Emotiones whose name contains search term */
  searchEmotiones(term: string): Observable<Emotion[]> {
    if (!term.trim()) {
      // if not search term, return empty Emotion array.
      return of([]);
    }
    return this.http.get<Emotion[]>(`${this.EmotionesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Emotiones matching "${term}"`) :
         this.log(`no Emotiones matching "${term}"`)),
      catchError(this.handleError<Emotion[]>('searchEmotiones', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Emotion to the server */
  addEmotion(Emotion: Emotion): Observable<Emotion> {
    return this.http.post<Emotion>(this.EmotionesUrl, Emotion, this.httpOptions).pipe(
      tap((newEmotion: Emotion) => this.log(`added Emotion w/ id=${newEmotion.id}`)),
      catchError(this.handleError<Emotion>('addEmotion'))
    );
  }

  /** DELETE: delete the Emotion from the server */
  deleteEmotion(id: number): Observable<Emotion> {
    const url = `${this.EmotionesUrl}/${id}`;

    return this.http.delete<Emotion>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Emotion id=${id}`)),
      catchError(this.handleError<Emotion>('deleteEmotion'))
    );
  }

  /** PUT: update the Emotion on the server */
  updateEmotion(Emotion: Emotion): Observable<any> {
    return this.http.put(this.EmotionesUrl, Emotion, this.httpOptions).pipe(
      tap(_ => this.log(`updated Emotion id=${Emotion.id}`)),
      catchError(this.handleError<any>('updateEmotion'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a EmotionService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EmotionService: ${message}`);
  }
}
