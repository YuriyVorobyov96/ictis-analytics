import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { AnalyticsPageVk, Filter } from 'src/app/shared/interfaces';
import { createChart } from 'src/app/shared/functions';

@Component({
  selector: 'app-graduation',
  templateUrl: './graduation.component.html',
  styleUrls: ['./graduation.component.css']
})
export class GraduationComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('graduationChart') graduationChartRef: ElementRef;
  @ViewChild('tooltip') tooltipRef: ElementRef;

  aSub$: Subscription;
  tooltip: MaterialInstance;
  filter: Filter = {};
  chart;
  pending = true;
  isFilterVisible = false;
  type = 'bar';
  label = 'Кол-во участников сообщества';
  top = 5;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.chartGenerator(this.type, this.top, this.label);
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
    this.top = filter.top || this.top;
    this.type = filter.type || this.type;
    this.label = filter.label || this.label;
    this.pending = true;
    this.filter = filter;
    
    this.chartGenerator(this.type, this.top, this.label);
  }

  isFilter(): boolean {
    return Object.keys(this.filter).length !== 0; 
  }
  
  chartGenerator(type, top, label) {
    const graduationConfig: any = {
      type,
      label,
      title: {
        display: true,
        text: 'Год выпуска'
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.aSub$ = this.analyticsService.getAnalyticsVKType('graduation').subscribe(
      (data: AnalyticsPageVk) => {
        graduationConfig.labels = data.graduationChart.filter((_, idx) => idx < top).map(item => item.label);

        if (label === 'Кол-во участников сообщества') {
          graduationConfig.data = data.graduationChart.filter((_, idx) => idx < top).map(item => item.number);
        } else {
          graduationConfig.data = data.graduationChart.filter((_, idx) => idx < top).map(item => item.percent);
        }

        const graduationContext = this.graduationChartRef.nativeElement.getContext('2d');

        graduationContext.canvas.height = '500px';

        this.chart = new Chart(graduationContext, createChart(graduationConfig));

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  }

}
