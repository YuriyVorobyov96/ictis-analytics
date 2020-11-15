import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { AnalyticsWebsiteData, Filter } from 'src/app/shared/interfaces';

declare const Plotly: any;

@Component({
  selector: 'app-cities-chart',
  templateUrl: './cities-chart.component.html',
  styleUrls: ['./cities-chart.component.css']
})
export class CitiesChartComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  @ViewChild("Graph", { static: true })
  private Graph: ElementRef; 

  aSub$: Subscription;
  tooltip: MaterialInstance;
  filter: Filter = {};
  count: number;
  chart;
  pending = true;
  isFilterVisible = false;
  params: any = {
    type: 'cities',
  }
  public data: any = []
  public layout: any = {
    font: {size: 12},
    autosize: true,
    xaxis: {automargin: true},
    yaxis: {automargin: true},
  }
  public config: any = {
    responsive: true,
  }

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.chartGenerator();
  }

  ngOnDestroy() {
    if (this.aSub$) {
      this.aSub$.unsubscribe();
    }
    this.tooltip.destroy();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  applyFilter(filter: Filter) {
    this.pending = true;
    this.filter = filter;

    if (filter.start) {
      this.params.start = filter.start;
    }
    if (filter.end) {
      this.params.end = filter.end;
    }

    this.data = [];
    
    this.chartGenerator();
  }

  isFilter(): boolean {
    return Object.keys(this.filter).length !== 0; 
  }

  chartGenerator() {
    this.aSub$ = this.analyticsService.getWebsiteData(this.params).subscribe(
      (data: AnalyticsWebsiteData) => {
        const x = [];
        const y = [];

        const obj = {};
        const obj2 = {};

        const dates = data.dates;

        Plotly.purge(this.Graph.nativeElement);
        
        for (let i = 0; i < data.chart.length; i++) {
          x.push(data.chart[i].label);
          for (let j = 0; j < data.chart[i].cities.length; j++) {
            if (y.indexOf(data.chart[i].cities[j].name) !== -1) {
              continue;
            }
            y.push(data.chart[i].cities[j].name);

            obj[data.chart[i].cities[j].name] = {}
            obj2[data.chart[i].cities[j].name] = {}
            dates.forEach(el => obj2[data.chart[i].cities[j].name][el] = null)
          }
          for (let j = 0; j < data.chart[i].cities.length; j++) {
            obj[data.chart[i].cities[j].name][data.chart[i].label] = data.chart[i].cities[j].number;
          }
        }

        const z = Object.keys(obj2).map(el => {
          return Object.keys(obj2[el]).map((el2) => {
            return obj[el].hasOwnProperty(el2) ? obj[el][el2] : null
          })
        });

        this.data.push({
          type: 'heatmap',
          hoverongaps: false,
          x,
          y,
          z,
        })

        Plotly.newPlot(this.Graph.nativeElement, this.data, this.layout, this.config);

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  }

}
