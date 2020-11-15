import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AnalyticsInterestsVk, AnalyticsInterestsVkItem, Filter } from 'src/app/shared/interfaces';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { Subscription } from 'rxjs';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { Chart } from 'chart.js';
import { createChart } from '../shared/functions';

@Component({
  selector: 'app-interests-analytics-page',
  templateUrl: './interests-analytics-page.component.html',
  styleUrls: ['./interests-analytics-page.component.css']
})
export class InterestsAnalyticsPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  @ViewChild('chart') interestsChartRef: ElementRef;
  @ViewChild('tapTarget') tapTargetRef: ElementRef;

  tapTarget: MaterialInstance;
  aSub$: Subscription;
  tooltip: MaterialInstance;
  interests: AnalyticsInterestsVkItem[];
  total: number;
  pairs: number;
  chart;
  filter: Filter = {};
  isFilterVisible = false;
  pending = true;
  top = 10;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.getInterests(this.top);
  }

  ngOnDestroy() {
    if (this.aSub$) {
      this.aSub$.unsubscribe();
    }
    this.tooltip.destroy();
    this.tapTarget.destroy();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  applyFilter(filter: Filter) {
    this.interests = [];
    this.pending = true;
    this.filter = filter;

    if (filter.top) {
      this.top = filter.top;
    } else {
      this.top = 10
    }
    
    this.getInterests(this.top);
  }

  isFilter(): boolean {
    return Object.keys(this.filter).length !== 0; 
  }

  openInfo() {
    this.tapTarget.open();
  }

  getInterests(top) {
    const interestsConfig: any = {
      type: 'horizontalBar',
      label: '',
      // color: '#4fc3f7',
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.aSub$ = this.analyticsService.getAnalyticsVKInterests().subscribe(
      (data: AnalyticsInterestsVk) => {
        this.interests = data.words.filter((_, idx) => idx < top);
        this.total = data.total;
        this.pairs = data.pairs;

        interestsConfig.labels = data.words.filter((_, idx) => idx < top).map(item => item.key);
        interestsConfig.data = data.words.filter((_, idx) => idx < top).map(item => item.number);

        const interestsContext = this.interestsChartRef.nativeElement.getContext('2d');

        interestsContext.canvas.height = '500px';

        this.chart = new Chart(interestsContext, createChart(interestsConfig));

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  }

}
