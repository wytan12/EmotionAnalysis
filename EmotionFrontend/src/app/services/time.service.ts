import { Injectable } from '@angular/core';
import moment from "moment/moment";
import {Timestamp} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TimeService {

  convertToDate(timeStamp:number):string{
    let dateTime;
    if (timeStamp.toString().length == 10){
      dateTime = new Date(Number(String(timeStamp)+"000"));
    }else{
      dateTime = new Date(timeStamp);
    }
    // let formatDate = dateTime.format('YYYY-MM-DD HH:mm:ss');
    let formatDate= dateTime.toLocaleString(); //获取当前时间
    // let formatDate3= dateTime.toLocaleDateString();
    // let formatDate4= dateTime.toLocaleTimeString();
    //
    // let formatDate1= dateTime.toTimeString();
    // let formatDate2= dateTime.toDateString();
    console.log(formatDate);
    // console.log(formatDate1);
    // console.log(formatDate2);
    // console.log(formatDate3);
    // console.log(formatDate4);
    return formatDate;
  }

  convertToDateMS(timeStamp:number):string{
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
