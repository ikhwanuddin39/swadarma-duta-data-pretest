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
import { ChartService } from 'src/app/core/api/chart.service';

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
  chartSeries: any[] = []

  constructor(
    private service: ChartService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getData().subscribe((res) => {
      this.chartSeries = res
      this.initChart();
    })
  }

  initChart() {
    this.chartOptions = {
      series: this.chartSeries,
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
