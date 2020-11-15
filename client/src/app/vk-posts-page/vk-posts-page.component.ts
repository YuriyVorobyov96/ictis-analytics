import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { MaterialService, MaterialInstance } from '../shared/classes/material.service';
import { AnalyticsPageVkPosts, Filter } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';
import { createChart } from '../shared/functions';

@Component({
  selector: 'app-vk-posts-page',
  templateUrl: './vk-posts-page.component.html',
  styleUrls: ['./vk-posts-page.component.css']
})
export class VkPostsPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  @ViewChild('chart') postsChartRef: ElementRef;
  @ViewChild('tooltip') tooltipRef: ElementRef;

  aSub$: Subscription;
  tooltip: MaterialInstance;
  tapTarget: MaterialInstance;
  filter: Filter = {};
  isFilterVisible = false;
  pending = true;
  label = 'Просмотры';
  type = 'line';
  top = 30;
  posts: AnalyticsPageVkPosts[] = [];
  chart;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.chartGenerator(this.type, this.top, this.label);
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

  openInfo() {
    this.tapTarget.open();
  }

  applyFilter(filter: Filter) {
    this.posts = [];
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
    const postsConfig: any = {
      type,
      label,
      color: '#4fc3f7',
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.aSub$ = this.analyticsService.getAnalyticsVKPosts().subscribe(
      (data: AnalyticsPageVkPosts[]) => {
        postsConfig.labels = data.filter((_, idx) => idx < top).map(item => item.date);

        this.posts = data;

        if (label === 'Просмотры') {
          postsConfig.data = data.filter((_, idx) => idx < top).map(item => item.viewsCount);
        } else if (label === 'Лайки') {
          postsConfig.data = data.filter((_, idx) => idx < top).map(item => item.likesCount);
        } else if (label === 'Репосты') {
          postsConfig.data = data.filter((_, idx) => idx < top).map(item => item.repostsCount);
        } else if (label === 'Комментарии') {
          postsConfig.data = data.filter((_, idx) => idx < top).map(item => item.commentsCount);
        }

        const postsContext = this.postsChartRef.nativeElement.getContext('2d');

        postsContext.canvas.height = '500px';

        this.chart = new Chart(postsContext, createChart(postsConfig));

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  } 

}
