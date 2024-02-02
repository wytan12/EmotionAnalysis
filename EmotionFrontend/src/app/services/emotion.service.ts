import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, filter, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { EmoReadWrite, EmoReg, EmoSurvey, Emotion, Test } from './emotion';
import moment from 'moment';

@Injectable({ providedIn: 'root' })
export class EmotionService {
  private EmotionesUrl = 'http:localhost:3000/'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET Emotiones from the server */
  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>('api/tests').pipe(
      tap((_) => this.log('fetched Emotiones')),
      catchError(this.handleError<Test[]>('getEmotiones', []))
    );
  }
  getEmoReadWrite(): Observable<EmoReadWrite[]> {
    return this.http
      .get<EmoReadWrite[]>('http://localhost:3000/api/findAllEmoReadWrite')
      .pipe(
        tap((_) => this.log('fetched Emotiones')),
        catchError(this.handleError<EmoReadWrite[]>('getEmotiones', []))
      );
  }
  getEmoSurvey(): Observable<EmoSurvey[]> {
    console.log('api/findAllEmoSurvey');
    return this.http
      .get<EmoSurvey[]>('http://localhost:3000/api/findAllEmoSurvey')
      .pipe(
        tap((_) => this.log('fetched EmoSurvey')),
        catchError(this.handleError<EmoSurvey[]>('EmoSurvey', []))
      );
  }
  getEmoReg(): Observable<EmoReg[]> {
    return this.http
      .get<EmoReg[]>('http://localhost:3000/api/findAllEmoReg')
      .pipe(
        tap((_) => this.log('fetched EmoReg')),
        catchError(this.handleError<EmoReg[]>('EmoReg', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new Emotion to the server */
  addEmotion(EmotionData: any): Observable<Emotion> {
    let timestamp = Date.now();
    const a: Emotion = new Emotion(' ', timestamp + '');
    console.log(a);
    return this.http
      .post<Emotion>(
        'http://localhost:3000/api/addEmotion',
        a,
        this.httpOptions
      )
      .pipe(
        // tap((newEmotion: Emotion) => this.log(`added Emotion w/ id=${newEmotion.id}`)),
        catchError(this.handleError<Emotion>('addEmotion'))
      );
  }
  addEmoReadWrite(EmotionData: any): Observable<EmoReadWrite> {
    let timestamp: string = Date.now().toString();
    let userID = 'userID123';
    let actionType = 'Reading';
    if (EmotionData.userID == EmotionData.author) {
      actionType = 'Writing';
    }
    const a: EmoReadWrite = new EmoReadWrite(
      EmotionData.noteID,
      'NoteTitle',
      'NoteContent',
      userID,
      timestamp,
      EmotionData.noEmotion,
      actionType
    );
    if (EmotionData.noEmotion == 1) {
      for (let i = 0; i < EmotionData.emotions.length; i++) {
        console.log(EmotionData.emotions[i].id);
        // const emotion = EmotionData.emotions[i];
        switch (Number(EmotionData.emotions[i].id)) {
          case 1:
            a.setJoyful(1);
            a.setJoyful_Intensity(EmotionData.emotions[i].value);
            break;
          case 2:
            a.setCurious(1);
            a.setCurious_Intensity(EmotionData.emotions[i].value);
            break;
          case 3:
            a.setSurprised(1);
            a.setSurprised_Intensity(EmotionData.emotions[i].value);
            break;
          case 4:
            a.setConfused(1);
            a.setConfused_Intensity(EmotionData.emotions[i].value);
            break;
          case 5:
            a.setAnxious(1);
            a.setAnxious_Intensity(EmotionData.emotions[i].value);
            break;
          case 6:
            a.setFrustrated(1);
            a.setFrustrated_Intensity(EmotionData.emotions[i].value);
            break;
          case 7:
            a.setBored(1);
            a.setBored_Intensity(EmotionData.emotions[i].value);
            break;
        }
      }
    }
    console.log(a);
    return this.http
      .post<EmoReadWrite>(
        'http://localhost:3000/api/addEmoReadWrite',
        a,
        this.httpOptions
      )
      .pipe(
        // tap((newEmotion: Emotion) => this.log(`added Emotion w/ id=${newEmotion.id}`)),
        catchError(this.handleError<EmoReadWrite>('addEmoReadWrite'))
      );
  }

  //ADDING REFLECTION HISTORY
  addReg(EmotionData: any): Observable<EmoReg> {
    let userID = 'userID123';
    let timestamp = Date.now().toString();
    const groupMembersString = EmotionData.GroupMembers.join(', ');
    const a: EmoReg = new EmoReg(
      userID,
      timestamp,
      groupMembersString, // Assign the string value to GroupMembers
      EmotionData.Visualization,
      EmotionData.Challenges,
      EmotionData.ImprovementWays,
      EmotionData.PositivePlan,
      EmotionData.Action
    );
    console.log(a);
    return this.http
      .post<EmoReg>('http://localhost:3000/api/addReg', a, this.httpOptions)
      .pipe(
        // tap((newEmotion: Emotion) => this.log(`added Emotion w/ id=${newEmotion.id}`)),
        catchError(this.handleError<EmoReg>('addaddReg'))
      );
  }

  addEmoSurvey(EmotionData: any): Observable<EmoSurvey> {
    let userID = 'userID123';
    let timestamp = Date.now().toString();
    const a: EmoSurvey = new EmoSurvey(
      userID,
      timestamp,
      EmotionData.Joyful,
      EmotionData.Curious,
      EmotionData.Surprised,
      EmotionData.Confused,
      EmotionData.Anxious,
      EmotionData.Frustrated,
      EmotionData.Bored,
      EmotionData.Inconducive,
      EmotionData.Reason,
      EmotionData.Remarks
    );
    console.log(a);

    return this.http
      .post<EmoSurvey>('api/addEmoSurvey', a, this.httpOptions)
      .pipe(
        // tap((newEmotion: Emotion) => this.log(`added Emotion w/ id=${newEmotion.id}`)),
        catchError(this.handleError<EmoSurvey>('addEmoSurvey'))
      );
  }

  // --------------------------------------------------------
  /** DELETE: delete the Emotion from the server */
  deleteEmotion(id: number): Observable<Emotion> {
    const url = `${this.EmotionesUrl}/${id}`;

    return this.http.delete<Emotion>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted Emotion id=${id}`)),
      catchError(this.handleError<Emotion>('deleteEmotion'))
    );
  }

  /** PUT: update the Emotion on the server */
  updateEmotion(Emotion: Emotion): Observable<any> {
    return this.http.put(this.EmotionesUrl, Emotion, this.httpOptions).pipe(
      tap((_) => this.log(`updated Emotion id=${Emotion.id}`)),
      catchError(this.handleError<any>('updateEmotion'))
    );
  }

  /** GET Emotion by id. Return `undefined` when id not found */
  getEmotionNo404<Data>(id: number): Observable<Emotion> {
    const url = `${this.EmotionesUrl}/?id=${id}`;
    return this.http.get<Emotion[]>(url).pipe(
      map((Emotiones) => Emotiones[0]), // returns a {0|1} element array
      tap((h) => {
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
      tap((_) => this.log(`fetched Emotion id=${id}`)),
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
      tap((x) =>
        x.length
          ? this.log(`found Emotiones matching "${term}"`)
          : this.log(`no Emotiones matching "${term}"`)
      ),
      catchError(this.handleError<Emotion[]>('searchEmotiones', []))
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
