import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { MaterialService } from '../shared/classes/material.service';
import { AnalyticsPage } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('usersCount') usersCountRef: ElementRef;
  @ViewChild('newUsersCount') newUsersCountRef: ElementRef;
  @ViewChild('sessionsCount') sessionsCountRef: ElementRef;
  @ViewChild('pageViewsCount') pageViewsCountRef: ElementRef;

  aSub$: Subscription;
  average: number;
  pending = true;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.aSub$) {
      this.aSub$.unsubscribe();
    }
  }

  ngAfterViewInit() {
    const usersConfig: any = {
      label: 'Пользователи',
      color: '#4fc3f7',
    };
    const newUsersConfig: any = {
      label: 'Новые пользователи',
      color: '#ffb74d',
    };
    const sessionsConfig: any = {
      label: 'Сессии',
      color: '#7e57c2',
    };
    const pageViewsConfig: any = {
      label: 'Просмотры страниц',
      color: '#9ccc65',
    };

    this.aSub$ = this.analyticsService.getAnalytics().subscribe(
      (data: AnalyticsPage) => {
        this.average = data.average;

        usersConfig.labels = data.chart.map(item => item.label);
        usersConfig.data = data.chart.map(item => item.usersCount);
        newUsersConfig.labels = data.chart.map(item => item.label);
        newUsersConfig.data = data.chart.map(item => item.newUsersCount);
        sessionsConfig.labels = data.chart.map(item => item.label);
        sessionsConfig.data = data.chart.map(item => item.sessionsCount);
        pageViewsConfig.labels = data.chart.map(item => item.label);
        pageViewsConfig.data = data.chart.map(item => item.pageViewsCount);

        const usersContext = this.usersCountRef.nativeElement.getContext('2d');
        const newUsersContext = this.newUsersCountRef.nativeElement.getContext('2d');
        const sessionsContext = this.sessionsCountRef.nativeElement.getContext('2d');
        const pageViewsContext = this.pageViewsCountRef.nativeElement.getContext('2d');

        usersContext.canvas.height = '300px';
        newUsersContext.canvas.height = '300px';
        sessionsContext.canvas.height = '300px';
        pageViewsContext.canvas.height = '300px';

        new Chart(usersContext, createChartConfig(usersConfig));
        new Chart(newUsersContext, createChartConfig(newUsersConfig));
        new Chart(sessionsContext, createChartConfig(sessionsConfig));
        new Chart(pageViewsContext, createChartConfig(pageViewsConfig));

        this.pending = false;

      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )

  }

}

function createChartConfig({ labels, data, label, color }) {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false,
        }
      ],
    }
  }
}
