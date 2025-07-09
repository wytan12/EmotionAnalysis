import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { BaseChartDirective } from 'ng2-charts';
import { SharedTimeService } from '../services/shared-time.service';
import { SharedViewService } from '../services/shared-view.service';
import { TitleService } from '../services/title.service';
import { NoteVisibilityService } from '../services/note-visibility.service';
import { API_ENDPOINTS } from '../shared/api-endpoints';
import { ActivatedRoute } from '@angular/router';

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
        filter: function (tooltipItem) {
          return tooltipItem.raw !== 0;
        },
        titleFont: {
          size: 15,
        },
        bodyFont: {
          size: 15,
        },
        padding: 15,
      },
    },
    // interaction: {
    //   mode: 'point',
    //   intersect: true,
    // },
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
    private route: ActivatedRoute, 
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
    this.resetViewFilter();
    let selectedTimeRange: (Date | null)[] = [null, null]; // Store the last selected time range
    const defaultFullTimeRange: [Date, Date] = [
      new Date(new Date().setFullYear(new Date().getFullYear() - 10)), // 10 years ago
      new Date(), // Today
    ];

    // Subscribe to the time range observable
    this.sharedTimeService.selectedTime$.subscribe(
      (timeRange: number[] | null) => {
        if (timeRange && timeRange.length === 2) {
          const from = new Date(timeRange[0]);
          const to = new Date(timeRange[1]);
          console.log('From Date:', from, 'To Date:', to);
          selectedTimeRange = [from, to]; // Update selected time range
          this.getData(from, to); // Fetch data with the new time range
        } else {
          console.log('Time Range Reset, using full range');
          selectedTimeRange = [
            defaultFullTimeRange[0],
            defaultFullTimeRange[1],
          ]; // Full time range if reset
          this.getData(defaultFullTimeRange[0], defaultFullTimeRange[1]);
        }
      }
    );

    // Subscribe to the view observable
    this.sharedViewService.selectedView$.subscribe((view: string | null) => {
      if (view) {
        this.selectedView = [view];
        // Use the last selected time range when a view is selected
        this.getData(
          selectedTimeRange[0] ?? defaultFullTimeRange[0],
          selectedTimeRange[1] ?? defaultFullTimeRange[1]
        );
      } else {
        this.sharedViewService.getViews().subscribe(
          (views: string[]) => {
            this.selectedView = views; // Set all views as default
            // Use the last selected time range or default to full time range
            this.getData(
              selectedTimeRange[0] ?? defaultFullTimeRange[0],
              selectedTimeRange[1] ?? defaultFullTimeRange[1]
            );
          },
          (error) => {
            console.error('Failed to fetch views:', error);
            // Handle error as needed
          }
        );
      }
    });

    // Optionally, fetch data with initial state if needed
    this.getData(defaultFullTimeRange[0], defaultFullTimeRange[1]);
  }

  ngAfterViewInit() {
    if (this.chart) {
      this.chart.update();
    }
  }

  private subscribeToTimeAndView() {
    let selectedTimeRange: (Date | null)[] = [null, null]; // Store the last selected time range

    // Subscribe to the time range observable
    this.sharedTimeService.selectedTime$.subscribe(
      (timeRange: number[] | null) => {
        if (timeRange && timeRange.length === 2) {
          const from = new Date(timeRange[0]);
          const to = new Date(timeRange[1]);
          console.log('Time Range Changed - From Date:', from, 'To Date:', to);
          selectedTimeRange = [from, to];
          this.getData(from, to); // Fetch data with the new time range
        } else {
          console.log('Time Range Reset');
          selectedTimeRange = [null, null]; // Reset time range
          this.getData(null, null); // Fetch default data for reset time range
        }
      }
    );

    // Subscribe to the view observable
    this.sharedViewService.selectedView$.subscribe((view: string | null) => {
      if (view) {
        this.selectedView = [view];
        this.getData(selectedTimeRange[0], selectedTimeRange[1]);
      } else {
        this.resetViewFilter();
        this.getData(selectedTimeRange[0], selectedTimeRange[1]);
      }
    });
  }

  async getData(from?: Date | null, to?: Date | null) {
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

    const allValuesZero = (data: (number | null)[]): boolean => {
      // Filter out null values and check if all remaining values are zero
      return data
        .filter((value): value is number => value !== null)
        .every((value) => value === 0);
    };

    const disableHover =
      allValuesZero(this.radarChartData.datasets[0].data) &&
      allValuesZero(this.radarChartData.datasets[1].data);

    if (this.radarChartOptions) {
      this.radarChartOptions.plugins!.tooltip!.enabled = !disableHover;

      if (this.chart) {
        this.chart.update();
      }
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
      
      const communityId = this.route.snapshot.paramMap.get('communityId');
      const token = localStorage.getItem('token'); // ✅ Get token from localStorage
      const url = `${API_ENDPOINTS.communityData}/${communityId}`;

      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      this.http.get<any[]>(url, { headers }).subscribe(
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

  private resetViewFilter() {
    // Set the selected view to a default or initial state
    this.selectedView = null;
    this.sharedViewService.getViews().subscribe(
      (views: string[]) => {
        this.selectedView = views; // Set all views as default if necessary
        this.getData(); // Reload data with reset view
      },
      (error) => {
        console.error('Failed to fetch views:', error);
      }
    );
  }
}
