import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild("chart") chart: any = ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  months = moment.months();
  listMonth = new Date()

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    this.chartOptions = {
      series: [
        {
          name: "Session Duration",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Page Views",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "Total Visits",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: 'Chart',
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'inter, sans-serif',
          color: '#263238'
        },
      },
      stroke: {
        width: 3,
        curve: "smooth",
        // colors: ["#2F80ED", "#828282", "#1DA87E", "#F28F47"]
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          style: {
            fontFamily: 'Inter, sans-serif',
          },
        },
        categories: [
          ...this.months
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val: any) {
                return val + " kg";
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      },
      yaxis: {
        labels: {
          formatter: function (val = 0) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' kg';
          },
          style: {
            fontFamily: 'Inter, sans-serif',
          },
        },
      },
    };
  }
}
