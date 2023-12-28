import { Component } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css'
})
export class RadarChartComponent {
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
      { data: [0, 1, 2, 2, 1, 3, 0], label: 'Reading' },
      { data: [1, 2, 1, 3, 1, 1, 0], label: 'Writing' },
    ],
  };
  public radarChartType: ChartType = 'radar';

  constructor(private router: Router) {}

  public handleChartClick() {
    this.router.navigate(['emotion-detail']);
  }
  ngOnInit() {
  }
}
