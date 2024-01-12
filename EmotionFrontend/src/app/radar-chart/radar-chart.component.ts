import {Component, OnInit, ViewChild} from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import {EmotionService} from "../services/emotion.service";
import {EmoReadWrite, EmoSurvey} from "../services/emotion";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css'
})
export class RadarChartComponent{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  // Radar
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = [
    'Joyful',
    'Curious',
    'Surprised',
    'Confused',
    'Anxious',
    'Frustrated',
    'Bored',
  ];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [], label: 'Reading' },
      { data: [], label: 'Writing' },
    ],
  };

  public radarChartType: ChartType = 'radar';

  constructor(private router: Router, private emotionService: EmotionService) {}

  public handleChartClick(event: any) {
    if (event.active && event.active.length > 0) {
      
      const clickedLabel = event.active[0];
      const value = this.radarChartLabels[clickedLabel.index]
      // console.log(value);
  
      this.router.navigate(['emotion-detail'], { queryParams: { title: value } });
    }
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    // Check if the chart is defined and update it after the view is initialized
    if (this.chart) {
      this.chart.update();
    }
  }

  async getData() {
    const dataHttp = await this.getDataHttp();
    this.radarChartData.datasets[0].data = dataHttp['Reading']; // Assuming dataHttp[0] contains average values for 'Reading'
    this.radarChartData.datasets[1].data = dataHttp['Writing']; // Assuming dataHttp[1] contains average values for 'Writing'

    // Trigger chart update after setting the data
    if (this.chart) {
      this.chart.update();
    }
  }

  public getDataHttp(): Promise<{ [key: string]: number[] }> {
    return new Promise<{ [key: string]: number[] }>(resolve => {
      const rdata: { [key: string]: number[] } = {
        'Reading': [0, 0, 0, 0, 0, 0, 0],
        'Writing': [0, 0, 0, 0, 0, 0, 0],
      };
      let totalEntries: { [key: string]: number } = {
        'Reading': 0,
        'Writing': 0,
      };
  
      this.emotionService.getEmoReadWrite().subscribe((emoReadWriteData: EmoReadWrite[]) => {
        const intensityKeys = ['Joyful', 'Curious', 'Surprised', 'Confused', 'Anxious', 'Frustrated', 'Bored'];
  
        for (let i = 0; i < emoReadWriteData.length; i++) {
          const dataEntry: any = emoReadWriteData[i];
          const actionType = dataEntry['ActionType'];
  
          for (const key of intensityKeys) {
            const emotionKey = key;
            const intensityKey = `${key}_Intensity`;
            rdata[actionType][intensityKeys.indexOf(key)] += dataEntry[intensityKey];
          }
  
          totalEntries[actionType]++;
        }
  
        // Calculate average intensity for each category
        for (const key of intensityKeys) {
          const index = intensityKeys.indexOf(key);
          rdata['Reading'][index] /= totalEntries['Reading'];
          rdata['Writing'][index] /= totalEntries['Writing'];
        }
  
        resolve(rdata);
      });
    });
  }
  
}
