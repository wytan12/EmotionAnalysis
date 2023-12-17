import { Component, OnInit } from '@angular/core';
//
// import { Hero } from '../hero';
// import { HeroService } from '../hero.service';
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, Test} from "../emotion";

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {
  tests: Test[] = [];
  emoReadWrite: EmoReadWrite[] = [];

  constructor(private emotionService: EmotionService) { }

  getData(): void {
    // JSON.stringify(this.emos);
    // this.emotionService.getEmoRW().subscribe(emos => this.emos = emos);
    // console.log(this.emos);
    // console.log(JSON.stringify(this.emos));

    this.emotionService.getEmotions().subscribe(emoReadWrite => this.emoReadWrite = emoReadWrite);
    console.log(this.emoReadWrite);
    // this.emotionService.getTests()
    //   .subscribe(tests => this.tests = tests);
    // // const tmp = this.emotionService.getTests();
    // console.log(JSON.stringify(this.tests));
    // const httpOptions = {
    //   headers = new HttpHeaders({
    //     'content-type': 'application/json'
    //   })
    // }

    // const params = new HttpParams()
    //   .set('orderBy', '"$key"')
    //   .set('limitToFirst', "1");
    //
    // this.http.get(this.configUrl,{params})
    //   .subscribe((data: any) => this.config = { ...data });
    //
    // this.http.post(url,
    //   {
    //     "courseListIcon": "...",
    //     "description": "TEST",
    //     "iconUrl": "..",
    //     "longDescription": "...",
    //     "url": "new-url"
    //   })
    //   .subscribe(
    //     (res) => {
    //       console.log("POST call successful value returned in body",
    //         res);
    //     },
    //     error => {
    //       console.log("POST call in error", error);
    //     },
    //     () => {
    //       console.log("The POST observable is now completed.");
    //     });
  // }
  }


  ngOnInit(): void {
    // this.getHeroes();
  }


}
