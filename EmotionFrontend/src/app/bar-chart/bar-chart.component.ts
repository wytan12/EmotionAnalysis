import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ChartType, ChartDataset, ChartOptions } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels"

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  ngOnInit(): void {
    
  }
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
    {data: [28,48,40,19,86,27,90], backgroundColor: 'rgba(0, 0, 200, 0.5)'},
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      // legend: {
      //   display: false, 
      // },
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
  
}