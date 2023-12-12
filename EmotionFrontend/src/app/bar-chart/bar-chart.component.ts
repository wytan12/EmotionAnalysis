import { Component, OnInit } from "@angular/core";
import { Label } from "ng2-charts"
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
  public barChartLabels: Label[]= ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataset[] = [
    {data: [65,59,80,81,56,55,40], label:'Series A'},
    {data: [28,48,40,19,86,27,90], label:'Series B'},
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: [{ type: 'category' }],
      y: [{ type: 'linear', ticks: { beginAtZero: true } }],
    },
    plugins:{
      datalabels:{
        anchor:'end',
        align:'end',
      }
    }
  };
  
}
