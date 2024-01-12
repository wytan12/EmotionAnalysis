import {Component, OnInit, ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import {ChartType, ChartDataset, ChartOptions, ChartData} from "chart.js";

import * as pluginDataLabels from "chartjs-plugin-datalabels"
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoSurvey} from "../services/emotion";
import {BaseChartDirective} from "ng2-charts";
import _default from "chart.js/dist/plugins/plugin.legend";
import labels = _default.defaults.labels;

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
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
  public barChartLegend = false;
  // public barChartPlugins = [pluginDataLabels];

  public barChartPlugins = [{
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }] as any[];

  public barChartData: ChartDataset[] = [
    {data: [1,2,3,4,5,6,7], backgroundColor: 'rgba(0, 0, 200, 0.5)'},
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
      this.emotionService.getEmoSurvey().subscribe(emoSurvey => {
        for (let i = 0; i < emoSurvey.length; i++) {
          const es: EmoSurvey = emoSurvey[i];
          rdata[0] += es.Joyful;
          rdata[1] += es.Curious;
          rdata[2] += es.Surprised;
          rdata[3] += es.Confused;
          rdata[4] += es.Anxious;
          rdata[5] += es.Frustrated;
          rdata[6] += es.Bored;
        }
        resolve(rdata);
      });
    });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      // legend: {
      //   display: false,
      // },
    },
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
  
      this.router.navigate(['scrollspy'], { queryParams: { title: value } });
    }
  }
  
  
}


