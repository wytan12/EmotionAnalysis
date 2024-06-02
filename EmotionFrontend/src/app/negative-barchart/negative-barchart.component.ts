import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ChartType, ChartDataset, ChartOptions } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels"

import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoSurvey} from "../services/emotion";
import {BaseChartDirective} from "ng2-charts";
import _default from "chart.js/dist/plugins/plugin.legend";
import labels = _default.defaults.labels;

import { SharedTimeService } from '../shared-time.service';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-negative-barchart',
  templateUrl: './negative-barchart.component.html',
  styleUrl: './negative-barchart.component.css'
})
export class NegativeBarchartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private router: Router,
    private emotionService: EmotionService,
    private sharedTimeService: SharedTimeService,
    private titleService: TitleService) {}

public data:number[] =[];

//  title: string;

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
    {data: [], label: 'Frequency of inconducive emotion'},
  ];

  ngOnInit(): void {
    // this.getData();
    this.sharedTimeService.selectedTime$.subscribe((timeRange: number[]) => {
      if (timeRange && timeRange.length === 2) {
        const from = new Date(timeRange[0]);
        console.log("From Date: ", from)
        const to = new Date(timeRange[1]);
        console.log("To Date: ", to)
        this.getData(from, to);
      } else{
        this.getData(undefined, undefined);
      }
    });
    this.sharedTimeService.selectedTime$.subscribe((timeRange: number[]) => {
      console.log('Selected time range:', timeRange);
    });
  }

  ngAfterViewInit() {
    // Check if the chart is defined and update it after the view is initialized
    if (this.chart) {
      this.chart.update();
    }
  }

  async getData(from?: Date, to?: Date) {
    //setting default value
    if (!from || !to) {
      // Set default values for from and to if not provided
      const defaultFromDate = new Date(); // Default to current date/time
      const defaultToDate = new Date(); // Default to current date/time
      defaultFromDate.setDate(defaultFromDate.getDate() - 100); // Default to one month ago
      this.getData(defaultFromDate, defaultToDate);
      return; // Exit function to prevent further execution
    }

    const dataHttp = await this.getDataHttp(from, to);
    this.data = dataHttp;
    console.log(this.data);
    this.barChartData[0].data= this.data;
    if (this.chart) {
      this.chart.update();
    }
    // this.chart?.update();
  }
  public getDataHttp(from: Date, to: Date): Promise<number[]> {
    return new Promise<number[]>(resolve => {
      const rdata: number[] = [0, 0, 0, 0, 0, 0, 0];

      this.emotionService.getEmoSurvey().subscribe(emoSurvey => {
        for (let i = 0; i < emoSurvey.length; i++) {
          const es: EmoSurvey = emoSurvey[i];
          const timestampnumber = es['Timestamp'];
          const timestamp = new Date(Number(timestampnumber) * 1000);
          if (timestamp >= from && timestamp <= to) {
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
        }

        resolve(rdata);
      });
    });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x:{
        ticks : {
          font :{
            size : 16
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

  };

  public handleChartClick(event: any) {
    if (event.active && event.active.length > 0) {
      const clickedLabel = event.active[0];
      const value = this.barChartLabels[clickedLabel.index]
      // console.log(value);
      // this.title = this.barChartLabels[clickedLabel.index];
      this.titleService.selectedTitle = value;
      console.log(value);
      // this.router.navigate(['survey-reason'], { queryParams: { title: value } });
    }
  }

}
