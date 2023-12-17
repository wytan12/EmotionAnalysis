import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emotion-detail',
  templateUrl: './emotion-detail.component.html',
  styleUrls: [ './emotion-detail.component.css' ]
})
export class EmotionDetailComponent implements OnInit {

  constructor(
  ) {}

  ngOnInit(): void {
  }

    // in component
    tableData: any[] = [{
    id:1,
    idea: 'What is the mostsustainable energysource?',
    date: '2017-08-19',
    address: '上海市普陀区金沙江路 1518 弄',
  }, {
    id:2,
      idea: 'What is the mostsustainable energysource?',
    date: '2017-08-20',
    address: '上海市普陀区金沙江路 1518 弄',
  }, {
    id:3,
    idea: 'What is the mostsustainable energysource?',
    date: '2017-08-21',
    address: '上海市普陀区金沙江路 1518 弄',
  }, {
    id:4,
    idea: 'What is the mostsustainable energysource?',
    date: '2017-08-22',
    intensity: '上海市普陀区金沙江路 1510 弄',
  }]
  reflect(ref: any): void {
    // console.log(ref.index)
    // console.log(ref.rowData)
    // console.log(ref.innerHTML)
    ref.destroy()
  }
}
