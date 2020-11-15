import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { AnalyticsWebsiteData, Filter } from 'src/app/shared/interfaces';
import { createChart } from 'src/app/shared/functions';

@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.css']
})
export class UsersChartComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('usersChart') usersChartRef: ElementRef;
  @ViewChild('tooltip') tooltipRef: ElementRef;

  aSub$: Subscription;
  tooltip: MaterialInstance;
  filter: Filter = {};
  count: number;
  chart;
  pending = true;
  isFilterVisible = false;
  type = 'line';
  label = 'Число пользователей';
  params: any = {
    type: 'usersCount',
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
    this.params = {
      type: 'usersCount',
    }

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
    const usersConfig: any = {
      type,
      label,
      title: {
        display: true,
        text: 'Пользователи'
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.aSub$ = this.analyticsService.getWebsiteDataSimple(this.params).subscribe(
      (data: AnalyticsWebsiteData) => {
        usersConfig.labels = data.chart.map(item => item.label);
        usersConfig.data = data.chart.map(item => item.usersCount);

        this.count = data.sum;

        const usersContext = this.usersChartRef.nativeElement.getContext('2d');

        usersContext.canvas.height = '500px';

        this.chart = new Chart(usersContext, createChart(usersConfig));

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  } 

}
