import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent implements OnInit {
  private data = [
    {
      x: 1,
      y: 0
    },
    {
      x: 2,
      y: 20
    },
    {
      x: 3,
      y: 10
    },
    {
      x: 4,
      y: -20
    },
    {
      x: 5,
      y: 50
    },
    {
      x: 6,
      y: -10
    },
    {
      x: 7,
      y: 40
    },
    {
      x: 1,
      y: 10
    },
    {
      x: 2,
      y: 20
    },
    {
      x: 3,
      y: 0
    },
    {
      x: 4,
      y: -20
    },
    {
      x: 5,
      y: 50
    },
    {
      x: 6,
      y: -10
    },
    {
      x: 7,
      y: 40
    }
  ];
  private labels = [];
  private dataPoints = [];

  @ViewChild('lineChart') el: ElementRef;
  lineChart: any;

  constructor() { }

  ngOnInit() {
    this.labels = this.data.map(item => item.x);
    this.dataPoints = this.data.map(item => item.y);
    this.lineChart = new Chart(this.el.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            yAxisID: 'A',
            data: this.dataPoints,
            borderColor: '#9970ed',
            borderWidth: 2,
            fill: false,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#fff',
            lineTension: 0, // draw straight lines
          },
          {
            yAxisID: 'B',
            data: this.dataPoints,
            borderColor: '#9970ed',
            borderWidth: 2,
            fill: false,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#fff',
            lineTension: 0, // draw straight lines
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            // add one xAxes on top
            {
              position: 'top',
              ticks: {
                display: false
              },
              gridLines: {
                display: false,
                drawTicks: false // no ticks
              }
            },
            {
              display: true,
              gridLines: {
                display: false,
              },
              ticks: {
                padding: 10,
              }
            }
          ],
          yAxes: [
            {
              id: 'A',
              type: 'linear',
              position: 'left',
              ticks: {
                callback: function (label, index, labels) {
                  return '';
                }
              },
              gridLines: {
                zeroLineColor: 'rgba(0, 0, 0, 0.1)',
                zeroLineWidth: 0.5,
                lineWidth: 0.5,
                drawTicks: false
              },
            },
            {
              id: 'B',
              type: 'linear',
              position: 'right',
              ticks: {
                padding: 15,
                callback: function (label, index, labels) {
                  return label + '%';
                }
              },
              gridLines: {
                zeroLineColor: 'rgba(0, 0, 0, 0.1)',
                zeroLineWidth: 0.5,
                lineWidth: 0.5,
                drawTicks: false
              },
            }
          ],
        },
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20
          }, // chart padding --> allow show full tooltip
        },
        elements: {
          point: {
            radius: 2
          }
        },
        tooltips: {
          backgroundColor: '#9970ed',
          xPadding: 8,
          yPadding: 8,
          displayColors: false,  // hide the color box
          yAlign: 'bottom',      // caret position
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel + '%';  // custom label
            },
            title: function (tooltipItem, data) {
              return;  // hide the title
            }
          },
        }
      }
    });
  }

}
