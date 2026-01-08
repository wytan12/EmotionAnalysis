import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType, ChartDataset, ChartOptions, ChartData } from 'chart.js';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { EmotionService } from '../services/emotion.service';
import { EmoReadWrite, EmoSurvey } from '../services/emotion';
import { BaseChartDirective } from 'ng2-charts';
import _default from 'chart.js/dist/plugins/plugin.legend';
import labels = _default.defaults.labels;

import { SharedTimeService } from '../services/shared-time.service';
import { TitleService } from '../services/title.service';
import { NoteVisibilityService } from '../services/note-visibility.service';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private router: Router,
    private emotionService: EmotionService,
    private sharedTimeService: SharedTimeService,
    private titleService: TitleService,
    private visibilityService: NoteVisibilityService,
    private communityService: CommunityService
  ) {}

  public data: number[] = [];

  public title: string = '';

  emoSurvey: EmoSurvey[] = [];

  public barChartLabels: string[] = [
    'Joyful',
    'Curious',
    'Surprised',
    'Confused',
    'Anxious',
    'Frustrated',
    'Bored',
  ];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartPlugins = [
    {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  ] as any[];

  public barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Average emotion intensity',
      backgroundColor: 'rgba(0, 0, 200, 0.5)',
    },
  ];

  ngOnInit(): void {
    // Get community ID from community service (set by parent component)
    const communityId = this.communityService.getCurrentCommunityId();
    console.log('Bar chart: Community ID from service:', communityId);

    // Load initial data
    this.getData(undefined, undefined);

    // Subscribe to time range changes
    this.sharedTimeService.selectedTime$.subscribe((timeRange: number[]) => {
      if (timeRange && timeRange.length === 2) {
        const from = new Date(timeRange[0]);
        console.log('Bar chart: From Date: ', from);
        const to = new Date(timeRange[1]);
        console.log('Bar chart: To Date: ', to);
        this.getData(from, to);
      } else {
        console.log('Bar chart: No time range selected, using defaults');
        this.getData(undefined, undefined);
      }
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
      // Set a very wide default range to include all data (5 years ago to future)
      defaultFromDate.setFullYear(defaultFromDate.getFullYear() - 5);
      defaultToDate.setFullYear(defaultToDate.getFullYear() + 1);
      console.log(
        'Bar chart: Using wide default date range:',
        defaultFromDate,
        'to',
        defaultToDate
      );
      this.getData(defaultFromDate, defaultToDate);
      return; // Exit function to prevent further execution
    }
    const dataHttp = await this.getDataHttp(from, to);
    this.data = dataHttp;
    console.log('Bar chart: Setting chart data:', this.data);
    this.barChartData[0].data = this.data;
    if (this.chart) {
      this.chart.update();
    }
  }

  public getDataHttp(from: Date, to: Date): Promise<number[]> {
    return new Promise<number[]>((resolve) => {
      const rdata: number[] = [0, 0, 0, 0, 0, 0, 0];
      let totalEntries = 0;

      console.log(
        'Bar chart: Fetching survey data for community:',
        this.communityService.getCurrentCommunityId()
      );

      this.emotionService.getEmoSurvey().subscribe((emoSurvey) => {
        console.log(
          'Bar chart: Received survey data:',
          emoSurvey.length,
          'entries'
        );

        for (let i = 0; i < emoSurvey.length; i++) {
          const es: EmoSurvey = emoSurvey[i];
          const timestampnumber = es['Timestamp'];
          // The timestamp is already in milliseconds, no need to multiply by 1000
          const timestamp = new Date(Number(timestampnumber));

          console.log(
            `Bar chart: Entry ${i} - Raw timestamp: ${timestampnumber}, Converted timestamp: ${timestamp}, From: ${from}, To: ${to}`
          );

          if (timestamp >= from && timestamp <= to) {
            console.log(`Bar chart: Entry ${i} included in date range`);
            rdata[0] += es.Joyful;
            rdata[1] += es.Curious;
            rdata[2] += es.Surprised;
            rdata[3] += es.Confused;
            rdata[4] += es.Anxious;
            rdata[5] += es.Frustrated;
            rdata[6] += es.Bored;
            totalEntries++;
          } else {
            console.log(`Bar chart: Entry ${i} excluded from date range`);
          }
        }

        console.log('Bar chart: Total entries processed:', totalEntries);
        console.log('Bar chart: Raw data before averaging:', rdata);

        // Calculate average value for each intensity
        if (totalEntries > 0) {
          for (let i = 0; i < rdata.length; i++) {
            rdata[i] /= totalEntries;
          }
          console.log('Bar chart: Final averaged data:', rdata);
        } else {
          console.log(
            'Bar chart: No entries found in date range, returning zeros'
          );
        }

        resolve(rdata);
      });
    });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 5,
        ticks: {
          font: {
            size: 18,
          },
          stepSize: 1,
          callback: function(value: any) {
            // Map numeric values to intensity labels
            const labels: { [key: number]: string } = {
              0: '0 (None)',
              1: '1 (Very Weak)',
              2: '2 (Weak)',
              3: '3 (Moderate)',
              4: '4 (Strong)',
              5: '5 (Very Strong)'
            };
            return labels[value] || value;
          }
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 15,
          },
        },
        onClick: () => {},
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y;
            const labels: { [key: string]: string } = {
              '0': 'None',
              '1': 'Very Weak',
              '2': 'Weak',
              '3': 'Moderate',
              '4': 'Strong',
              '5': 'Very Strong'
            };
            // Find the closest intensity level
            const roundedValue = Math.round(value);
            const label = labels[roundedValue.toString()] || '';
            return `${context.dataset.label}: ${value.toFixed(2)} (${label})`;
          }
        }
      }
    },
  };

  // public handleChartClick(event: any) {
  //   if (event.active && event.active.length > 0) {
  //     const clickedLabel = event.active[0];
  //     const value = this.barChartLabels[clickedLabel.index];

  //     // this.title = value;
  //     this.visibilityService.setVisibility('SurveyNote', true);
  //     this.titleService.selectedTitle = value;
  //     console.log(value);
  //     // this.router.navigate(['survey-reason'], { queryParams: { title: value } });
  //   }
  // }
}
