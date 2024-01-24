import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChartType, ChartDataset, ChartOptions } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels"

@Component({
  selector: 'app-negative-barchart',
  templateUrl: './negative-barchart.component.html',
  styleUrl: './negative-barchart.component.css'
})
export class NegativeBarchartComponent implements OnInit {
  ngOnInit(): void {
    
  }
  public barChartLabels: string[]= ['Bored', 'Frustrated', 'Anxious'];

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
    {data: [65,59,80] },
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
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

  constructor(private router: Router) {}

  public handleChartClick(event: any) {
    if (event.active && event.active.length > 0) {
      this.router.navigate(['emotion-detail']);
    }
  }

  navigate() {
    this.router.navigate(['survey']);
  }
}
