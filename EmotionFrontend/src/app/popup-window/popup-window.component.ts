import { Component, OnInit , TemplateRef, ViewChild } from '@angular/core';
import { DialogService, ModalService } from 'ng-devui/modal';
import {FormLayout} from "ng-devui";
@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css']
})
export class PopupWindowComponent implements OnInit {
  layoutDirection: FormLayout = FormLayout.Columns;
  isShow = false;
  color = ['#fac20a','#beccfa','#fac20a','#c7000b'];
  ngOnInit(): void {

  }
  radioOptions = [{
    id: 0,
    label: "No, I don't fell anything"
  }, {
    id: 1,
    label: 'Yes, I feel a certain emotion'
  }];


  emotionOptions = [
    {
      name: 'Joyful 😃',
      value: 0,
    },
    {
      name: 'Curious 😳',
      value: 0,
    },
    {
      name: 'Surprised 😲',
      value: 0,
    },
    {
      name: 'Confused 😕',
      value: 0,
    },
    {
      name: 'Anxious 😰',
      value: 0,
    },
    {
      name: 'Frustrated 😣',
      value: 0,
    },
    {
      name: 'Bored 🥱',
      value: 0,
    }
  ];
  select1:any[]=[];
  formData = {
    radioValue: {},
    // select1:any[]=[],
  };
  fisrtChange(item: string): void {
    console.log(Number(item));
    if (Number(item)==0){
      this.isShow=false;
    }else {
      this.isShow=true;
    }
  }

  secondChange(item: string): void {
    console.log(item);
    console.log(this.select1);
    console.log(this.select1.length);
  }
}

