import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { AnalyticsPageVk, Filter } from 'src/app/shared/interfaces';
import { createChart } from 'src/app/shared/functions';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('facultyChart') facultyChartRef: ElementRef;
  @ViewChild('tooltip') tooltipRef: ElementRef;

  aSub$: Subscription;
  tooltip: MaterialInstance;
  filter: Filter = {};
  chart;
  pending = true;
  isFilterVisible = false;
  type = 'polarArea';
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
    const facultyConfig: any = {
      type,
      label,
      title: {
        display: true,
        text: 'Факультет'
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.aSub$ = this.analyticsService.getAnalyticsVKType('faculty').subscribe(
      (data: AnalyticsPageVk) => {
        facultyConfig.labels = data.facultyChart.filter((_, idx) => idx < top).map(item => item.label);

        if (label === 'Кол-во участников сообщества') {
          facultyConfig.data = data.facultyChart.filter((_, idx) => idx < top).map(item => item.number);
        } else {
          facultyConfig.data = data.facultyChart.filter((_, idx) => idx < top).map(item => item.percent);
        }

        const facultyContext = this.facultyChartRef.nativeElement.getContext('2d');

        facultyContext.canvas.height = '500px';

        this.chart = new Chart(facultyContext, createChart(facultyConfig));

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  }

}
