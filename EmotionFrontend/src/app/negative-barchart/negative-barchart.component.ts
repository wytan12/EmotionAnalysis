import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ChartType, ChartDataset, ChartOptions } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels"

import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoSurvey} from "../services/emotion";
import {BaseChartDirective} from "ng2-charts";
import _default from "chart.js/dist/plugins/plugin.legend";
import labels = _default.defaults.labels;

import { SharedTimeService } from '../services/shared-time.service';
import { TitleService } from '../services/title.service';
import { NoteVisibilityService } from '../services/note-visibility.service';

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
    private titleService: TitleService,
    private visibilityService: NoteVisibilityService) {}

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
    let fromDate = from;
    let toDate = to;
  
    // If no date range provided, determine bounds from data
    if (!from || !to) {
      const allData = await this.emotionService.getEmoSurvey().toPromise();
      if (!allData || allData.length === 0) {
        this.data = [0, 0, 0, 0, 0, 0, 0];
        this.barChartData[0].data = this.data;
        this.chart?.update();
        return;
      }
  
      const timestamps = allData.map(es => new Date(Number(es.Timestamp) * 1000));
      fromDate = new Date(Math.min(...timestamps.map(d => d.getTime())));
      toDate = new Date(Math.max(...timestamps.map(d => d.getTime())));
    }
  
    const dataHttp = await this.getDataHttp(fromDate!, toDate!);
    this.data = dataHttp;
    this.barChartData[0].data = this.data;
    this.chart?.update();
  }
  

  public getDataHttp(from: Date, to: Date): Promise<number[]> {
    return new Promise<number[]>(resolve => {
      const rdata: number[] = [0, 0, 0, 0, 0, 0, 0];
  
      this.emotionService.getEmoSurvey().subscribe(emoSurvey => {
        for (const es of emoSurvey) {
          const timestamp = new Date(Number(es.Timestamp) * 1000);
          if (timestamp >= from && timestamp <= to) {
            if (es.Inconducive.includes('Joyful')) rdata[0]++;
            if (es.Inconducive.includes('Curious')) rdata[1]++;
            if (es.Inconducive.includes('Surprised')) rdata[2]++;
            if (es.Inconducive.includes('Confused')) rdata[3]++;
            if (es.Inconducive.includes('Anxious')) rdata[4]++;
            if (es.Inconducive.includes('Frustrated')) rdata[5]++;
            if (es.Inconducive.includes('Bored')) rdata[6]++;
          }
        }
  
        resolve(rdata);
        console.log("Final array:", rdata);
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
        display: true,
        labels: {
          font :{
            size:15
          },
        },
        onClick: () => {},
      }
    }

  };

  public handleChartClick(event: any) {
    if (event.active && event.active.length > 0) {
      const clickedLabel = event.active[0];
      const value = this.barChartLabels[clickedLabel.index]
      // console.log(value);
      // this.title = this.barChartLabels[clickedLabel.index];
      this.visibilityService.setVisibility('SurveyNote', true);
      this.titleService.selectedTitle = value;
      console.log(value);
      // this.router.navigate(['survey-reason'], { queryParams: { title: value } });
    }
  }

}
