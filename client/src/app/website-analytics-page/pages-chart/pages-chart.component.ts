import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { AnalyticsWebsiteData, Filter } from 'src/app/shared/interfaces';
import { createChart } from 'src/app/shared/functions';

@Component({
  selector: 'app-pages-chart',
  templateUrl: './pages-chart.component.html',
  styleUrls: ['./pages-chart.component.css']
})
export class PagesChartComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('pageViewsChart') pageViewsRef: ElementRef;
  @ViewChild('tooltip') tooltipRef: ElementRef;

  aSub$: Subscription;
  tooltip: MaterialInstance;
  filter: Filter = {};
  count: number;
  chart;
  pending = true;
  isFilterVisible = false;
  type = 'line';
  label = 'Число просмотров';
  params: any = {
    type: 'pageViewsCount',
  }

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.chartGenerator(this.type, this.label);
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
    this.type = filter.type || this.type;
    this.pending = true;
    this.filter = filter;

    if (filter.start) {
      this.params.start = filter.start;
    }
    if (filter.end) {
      this.params.end = filter.end;
    }
    
    this.chartGenerator(this.type, this.label);
  }

  isFilter(): boolean {
    return Object.keys(this.filter).length !== 0; 
  }

  chartGenerator(type, label) {
    const pageViewsConfig: any = {
      type,
      label,
      title: {
        display: true,
        text: 'Просмотры страниц'
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.aSub$ = this.analyticsService.getWebsiteDataSimple(this.params).subscribe(
      (data: AnalyticsWebsiteData) => {
        pageViewsConfig.labels = data.chart.map(item => item.label);
        pageViewsConfig.data = data.chart.map(item => item.pageViewsCount);

        this.count = data.sum;

        const pageViewsContext = this.pageViewsRef.nativeElement.getContext('2d');

        pageViewsContext.canvas.height = '500px';

        this.chart = new Chart(pageViewsContext, createChart(pageViewsConfig));

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  } 

}
