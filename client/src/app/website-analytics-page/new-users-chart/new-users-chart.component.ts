import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { AnalyticsWebsiteData, Filter } from 'src/app/shared/interfaces';
import { createChart } from 'src/app/shared/functions';


@Component({
  selector: 'app-new-users-chart',
  templateUrl: './new-users-chart.component.html',
  styleUrls: ['./new-users-chart.component.css']
})
export class NewUsersChartComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('newUsersChart') newUsersChartRef: ElementRef;
  @ViewChild('tooltip') tooltipRef: ElementRef;

  aSub$: Subscription;
  tooltip: MaterialInstance;
  filter: Filter = {};
  count: number;
  chart;
  pending = true;
  isFilterVisible = false;
  type = 'line';
  label = 'Число новых пользователей';
  params: any = {
    type: 'newUsersCount',
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
    const newUsersConfig: any = {
      type,
      label,
      title: {
        display: true,
        text: 'Новые пользователи'
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.aSub$ = this.analyticsService.getWebsiteDataSimple(this.params).subscribe(
      (data: AnalyticsWebsiteData) => {
        newUsersConfig.labels = data.chart.map(item => item.label);
        newUsersConfig.data = data.chart.map(item => item.newUsersCount);

        this.count = data.sum;

        const newUsersContext = this.newUsersChartRef.nativeElement.getContext('2d');

        newUsersContext.canvas.height = '500px';

        this.chart = new Chart(newUsersContext, createChart(newUsersConfig));

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  }

}
