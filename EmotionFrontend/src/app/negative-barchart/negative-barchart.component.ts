import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ChartType, ChartDataset, ChartOptions } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels"

import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoSurvey} from "../services/emotion";
import {BaseChartDirective} from "ng2-charts";
import _default from "chart.js/dist/plugins/plugin.legend";
import labels = _default.defaults.labels;

@Component({
  selector: 'app-negative-barchart',
  templateUrl: './negative-barchart.component.html',
  styleUrl: './negative-barchart.component.css'
})
export class NegativeBarchartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private router: Router,
    private emotionService: EmotionService) {}

public data:number[] =[];
ngOnInit(): void {
this.getData();
}

emoSurvey: EmoSurvey[] = [];
  public barChartLabels: string[]= [
    'Joyful',
    'Curious',
    'Surprised',
    'Confused',
    'Anxious',
    'Frustrated',
    'Bored',
];

  // public barChartType: ChartType = "bar";
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartPlugins = [{
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }] as any[];

  public barChartData: ChartDataset[] = [
    {data: [1,2,3, 4, 5, 6, 7], label: 'Frequency of inconducive emotion'},
  ];

  async getData() {
    const dataHttp = await this.getDataHttp();
    this.data = dataHttp;
    console.log(this.data);
    this.barChartData[0].data= this.data;
    this.chart?.update();
  }
  public getDataHttp(): Promise<number[]> {
    return new Promise<number[]>(resolve => {
      const rdata: number[] = [0, 0, 0, 0, 0, 0, 0];
      let totalEntries = 0;

      this.emotionService.getEmoSurvey().subscribe(emoSurvey => {
        for (let i = 0; i < emoSurvey.length; i++) {
          const es: EmoSurvey = emoSurvey[i];
            if (es.Inconducive === 'Joyful') {
              rdata[0]++;
            } else if (es.Inconducive === 'Curious') {
              rdata[1]++;
            } else if (es.Inconducive === 'Surprised') {
              rdata[2]++;
            } else if (es.Inconducive === 'Confused') {
              rdata[3]++;
            } else if (es.Inconducive === 'Anxious') {
              rdata[4]++;
            } else if (es.Inconducive === 'Frustrated') {
              rdata[5]++;
            } else if (es.Inconducive === 'Bored') {
              rdata[6]++;
            }
        }

        resolve(rdata);
      });
    });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x:{
        ticks : {
          font :{
            size : 18
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks : {
        font :{
          size : 18
        }
      }
      }
    },
    plugins :{
      legend :{
        labels: {
          font :{
            size:15
          }
        }
      }
    }
    // scales: {
    //   x: [{ type: 'category' }],
    //   // y: [{
    //   //   type: 'linear',
    //   //   beginAtZero: true,
    //   //   ticks: {
    //   //     beginAtZero: true,
    //   //   },
    //   //   // Add any other required properties
    //   // }],
      
    // },
  //   plugins:{
  //     datalabels:{
  //       anchor:'end',
  //       align:'end',
  //     }
  //   }
  };

  public handleChartClick(event: any) {
    if (event.active && event.active.length > 0) {
      const clickedLabel = event.active[0];
      const value = this.barChartLabels[clickedLabel.index]
      // console.log(value);
  
      this.router.navigate(['survey-reason'], { queryParams: { title: value } });
    }
  }

}
