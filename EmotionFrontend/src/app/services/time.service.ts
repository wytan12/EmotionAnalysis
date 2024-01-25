import { Injectable } from '@angular/core';
import moment from "moment/moment";
import {Timestamp} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TimeService {

  convertToDate(timeStamp:number):string{
    let dateTime = new Date(timeStamp);
    // let formatDate = dateTime.format('YYYY-MM-DD HH:mm:ss');
    let formatDate= dateTime.toLocaleString(); //获取当前时间
    return formatDate;
  }
  convertToTimeStamp(date:Date):number{
    const timestamp = date.getTime();
    return timestamp;
  }

}
