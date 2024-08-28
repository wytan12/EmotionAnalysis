import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Ticks } from 'chart.js';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { BaseChartDirective } from 'ng2-charts';
import { SharedTimeService } from '../services/shared-time.service';
import { SharedViewService } from '../services/shared-view.service';
import { TitleService } from '../services/title.service';
import { NoteVisibilityService } from '../services/note-visibility.service';

@Component({
  selector: 'app-radar-chart-jerrisonapi',
  templateUrl: './radar-chart-jerrisonapi.component.html',
  styleUrl: './radar-chart-jerrisonapi.component.css',
})
export class RadarChartJerrisonapiComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  isLoading = true;

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        pointLabels: {
          font: {
            size: 15,
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
        titleFont: {
          size: 15,
        },
        bodyFont: {
          size: 15,
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
      {
        data: [],
        label: 'Read',
        pointRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
      {
        data: [],
        label: 'Write',
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        pointBackgroundColor: 'blue',
        pointRadius: 5,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
      },
    ],
  };

  public radarChartType: ChartType = 'radar';

  constructor(
    private router: Router,
    private http: HttpClient, // Inject HttpClient
    private sharedTimeService: SharedTimeService,
    private sharedViewService: SharedViewService,
    private titleService: TitleService,
    private visibilityService: NoteVisibilityService
  ) {}

  public handleChartClick(event: any) {
    if (event.active && event.active.length > 0) {
      const clickedLabel = event.active[0];
      const value = this.radarChartLabels[clickedLabel.index] || null;
      const dataset = this.radarChartData.datasets[clickedLabel.datasetIndex];
      const datasetLabel = dataset.label || null;

      console.log('test');
      console.log(datasetLabel);
      console.log(clickedLabel);
      console.log(value);

      if (datasetLabel === 'read') {
        const readingValue =
          this.radarChartData.datasets[0].data[clickedLabel.index];
        console.log('Reading:', readingValue);
      } else if (datasetLabel === 'write') {
        const writingValue =
          this.radarChartData.datasets[1].data[clickedLabel.index];
        console.log('Writing:', writingValue);
      }

      // console.log(datasetLabel);
      // console.log(clickedLabel);
      // console.log(value);

      this.visibilityService.setVisibility('EmotionNote', true);
      this.titleService.selectedTitle = value;
      this.titleService.selectedLabel = datasetLabel;
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

    this.sharedViewService.selectedView$.subscribe((view: string | null) => {
      if (view) {
        this.selectedView = [view];
        this.getData();
      } else {
        this.sharedViewService.getViews().subscribe((views: string[]) => {
          this.selectedView = views; // Set all views as default
          this.getData(); // Fetch data based on selected view
        });
      }
    });
  }

  ngAfterViewInit() {
    if (this.chart) {
      this.chart.update();
    }
  }

  async getData(from?: Date, to?: Date) {
    this.isLoading = true; // Start loading
    if (!from || !to) {
      const defaultFromDate = new Date();
      const defaultToDate = new Date();
      defaultFromDate.setDate(defaultFromDate.getDate() - 10000);
      this.getData(defaultFromDate, defaultToDate);
      return;
    }

    const dataHttp = await this.getDataHttp(from, to);
    this.radarChartData.datasets[0].data = dataHttp['Read'];
    this.radarChartData.datasets[1].data = dataHttp['Write'];

    if (this.chart) {
      this.chart.update();
    }
    this.isLoading = false;
  }

  public getDataHttp(
  from: Date,
  to: Date
): Promise<{ [key: string]: number[] }> {
  return new Promise<{ [key: string]: number[] }>((resolve) => {
    const rdata: { [key: string]: number[] } = {
      Read: [0, 0, 0, 0, 0, 0, 0],
      Write: [0, 0, 0, 0, 0, 0, 0],
    };
    const totalEntries: { [key: string]: Set<string> } = {
      read: new Set<string>(),
      write: new Set<string>(),
    };

    this.http.get<any[]>('http://localhost:3000/api/community-data').subscribe(
      (response: any[]) => {
        const intensityKeys = [
          'Joyful',
          'Curious',
          'Surprised',
          'Confused',
          'Anxious',
          'Frustrated',
          'Bored',
        ];

        response.forEach((dataEntry) => {
          const actionType = dataEntry['actionType'];
          const timestamp = new Date(dataEntry['created']);
          const _id = dataEntry['_id'];

          // Check if the entry matches the selected view
          const viewsMatch = this.selectedView
            ? dataEntry.inViews.some((view: any) =>
                this.selectedView?.includes(view.title)
              )
            : true;

          if (timestamp >= from && timestamp <= to && viewsMatch) {
            intensityKeys.forEach((key, index) => {
              const emotionId = `eat_${key.toLowerCase()}`;
              const rating = dataEntry['ratings']?.find(
                (r: any) => r.emotionId === emotionId
              );
              const intensity = rating ? rating.intensity : 0;

              if (actionType === 'read' || actionType === 'write') {
                const typeKey =
                  actionType.charAt(0).toUpperCase() + actionType.slice(1);
                if (rdata[typeKey]) {
                  rdata[typeKey][index] += intensity;
                  totalEntries[actionType].add(_id);
                }
              }
            });
          }
        });

        // Convert Sets to counts
        const readCount = totalEntries['read'].size;
        const writeCount = totalEntries['write'].size;

        intensityKeys.forEach((key, index) => {
          rdata['Read'][index] /= readCount || 1;
          rdata['Write'][index] /= writeCount || 1;
        });

        resolve(rdata);
      },
      (error) => {
        console.error('Error fetching data:', error);
        resolve({
          Reading: [0, 0, 0, 0, 0, 0, 0],
          Writing: [0, 0, 0, 0, 0, 0, 0],
        });
      }
    );
  });
}
}
