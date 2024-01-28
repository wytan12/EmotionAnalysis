import { Component, OnInit } from '@angular/core';
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoReg, EmoSurvey, Test} from "../services/emotion";
import {TimeService} from "../services/time.service";

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.css']
})
export class StaticsComponent implements OnInit {
  tests: Test[] = [];
  emoReadWrite: EmoReadWrite[] = [];
  emoReg:EmoReg[] = [];
  emoSurvey:EmoSurvey[] = [];
  constructor(private emotionService: EmotionService, private timeService:TimeService) { }


  getEmoReadWrite(): void{
    this.emotionService.getEmoReadWrite().subscribe(emoReadWrite => this.emoReadWrite = emoReadWrite);
    console.log(this.emoReadWrite);
  }
  getEmoReg(): void{
    this.emotionService.getEmoReg().subscribe(emoReg => this.emoReg = emoReg);
    console.log(this.emoReg);
  }

  getEmoSurvey(): void{
    this.emotionService.getEmoSurvey().subscribe(emoSurvey => this.emoSurvey = emoSurvey);
    console.log(this.emoSurvey);
  }

  ngOnInit(): void {
    // this.getHeroes();
    console.log("1706449063");
    this.timeService.convertToDate(1706449063);
    this.timeService.convertToDateMS(1706449063);
  }


}
