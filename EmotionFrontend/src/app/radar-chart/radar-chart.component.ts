import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Ticks } from 'chart.js';
import { Router } from '@angular/router';
import { EmotionService } from '../services/emotion.service';
import { EmoReadWrite, EmoSurvey } from '../services/emotion';
import { BaseChartDirective } from 'ng2-charts';
import { SharedTimeService } from '../shared-time.service';
import { SharedViewService } from '../shared-view.service';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css',
})
export class RadarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  // Radar
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 15, // Adjust the font size as needed
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18,
          },
        },
      },
      tooltip: {
        enabled: true,
        titleFont:{
          size:15,
        },
        bodyFont: {
          size: 15, // Set the font size for the tooltip text
        },
        padding: 15,
      },
    },
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
      { data: [], label: 'Reading', pointRadius: 5,  
      pointHoverBackgroundColor: '#fff',pointHoverBorderColor: 'rgb(255, 99, 132)'},
      {
        data: [],
        label: 'Writing',
        borderColor: 'blue', // Set border color to blue
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        pointBackgroundColor: 'blue',
        pointRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
    ],
  };

  public radarChartType: ChartType = 'radar';

  constructor(
    private router: Router,
    private emotionService: EmotionService,
    private sharedTimeService: SharedTimeService,
    private sharedViewService: SharedViewService,
    private titleService: TitleService
  ) {}

  public handleChartClick(event: any) {
    if (event.active && event.active.length > 0) {
      const clickedLabel = event.active[0];
      const value = this.radarChartLabels[clickedLabel.index] || null;
      const dataset = this.radarChartData.datasets[clickedLabel.datasetIndex];
      const datasetLabel = dataset.label || null;

      if (datasetLabel == 'Reading') {
        const readingValue =
          this.radarChartData.datasets[0].data[clickedLabel.index];
        console.log('Reading:', readingValue);
      } else if (datasetLabel == 'Writing') {
        const writingValue =
          this.radarChartData.datasets[1].data[clickedLabel.index];
        console.log('Writing:', writingValue);
      }

      console.log(datasetLabel);
      console.log(clickedLabel);
      console.log(value);

      this.titleService.selectedTitle = value;
      this.titleService.selectedLabel = datasetLabel;


      // this.router.navigate(['emotion-rating'], {
      //   queryParams: { title: value, datasetLabel: datasetLabel },
      // });
    }
  }

  timeRange: number[] | null = null;
  selectedView: string[] | null = null;

  ngOnInit() {
    this.sharedTimeService.selectedTime$.subscribe((timeRange: number[]) => {
      if (timeRange && timeRange.length === 2) {
        const from = new Date(timeRange[0]);
        console.log('From Date: ', from);
        const to = new Date(timeRange[1]);
        console.log('To Date: ', to);
        this.getData(from, to);
      } else {
        this.getData(undefined, undefined);
      }
    });
    this.sharedTimeService.selectedTime$.subscribe((timeRange: number[]) => {
      console.log('Selected time range:', timeRange);
    });
    this.sharedViewService.selectedView$.subscribe((view: string | null) => {
      if (!view) {
        // Default view if null
        this.selectedView = ['Energy & Solar group 1', 'Data science/AI group 6'];
        console.log('Default Radar chart view: ', this.selectedView);
      } else {
        this.selectedView = [view];
        console.log('Radar chart view: ', this.selectedView);
      }
      this.getData(); // Call getData after setting the view
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
      defaultFromDate.setDate(defaultFromDate.getDate() - 500); // Default to one month ago
      this.getData(defaultFromDate, defaultToDate);
      return; // Exit function to prevent further execution
    }

    const dataHttp = await this.getDataHttp(from, to);
    this.radarChartData.datasets[0].data = dataHttp['Reading'];
    this.radarChartData.datasets[1].data = dataHttp['Writing']; 

    // Trigger chart update after setting the data
    if (this.chart) {
      this.chart.update();
    }
  }

  public getDataHttp(
    from: Date,
    to: Date
  ): Promise<{ [key: string]: number[] }> {
    return new Promise<{ [key: string]: number[] }>((resolve) => {
      const rdata: { [key: string]: number[] } = {
        Reading: [0, 0, 0, 0, 0, 0, 0],
        Writing: [0, 0, 0, 0, 0, 0, 0],
      };
      let totalEntries: { [key: string]: number } = {
        Reading: 0,
        Writing: 0,
      };

      this.emotionService
        .getEmoReadWrite()
        .subscribe((emoReadWriteData: EmoReadWrite[]) => {
          const intensityKeys = [
            'Joyful',
            'Curious',
            'Surprised',
            'Confused',
            'Anxious',
            'Frustrated',
            'Bored',
          ];

          for (let i = 0; i < emoReadWriteData.length; i++) {
            const dataEntry: any = emoReadWriteData[i];
            const actionType = dataEntry['ActionType'];
            const timestampnumber = dataEntry['Timestamp'];
            const timestamp = new Date(timestampnumber * 1000);

            // Filter data based on the timestamp within the selected time range
            // and the selected view
            const entryViews: string | undefined = dataEntry['Views'];
            // console.log('Data Views are:', entryViews);
            // Filter data based on the timestamp within the selected time range
            if (
              timestamp >= from &&
              timestamp <= to &&
              this.selectedView &&
              entryViews &&
              this.selectedView.some(view => entryViews.includes(view))
            ) {
              for (const key of intensityKeys) {
                const emotionKey = key;
                const intensityKey = `${key}_Intensity`;
                if (actionType === 'Reading') {
                  rdata[actionType][intensityKeys.indexOf(key)] +=
                    dataEntry[intensityKey];
                } else if (actionType === 'Writing') {
                  rdata[actionType][intensityKeys.indexOf(key)] +=
                    dataEntry[intensityKey];
                }
                totalEntries[actionType]++;
              }
            }
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
