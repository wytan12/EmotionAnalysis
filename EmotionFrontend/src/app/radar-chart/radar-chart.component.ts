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
      { data: [65, 59, 90, 81, 56, 55, 40], label: 'Reading' },
      { data: [28, 48, 40, 19, 96, 27, 100], label: 'Writing' },
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
