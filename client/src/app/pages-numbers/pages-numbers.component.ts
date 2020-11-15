import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AnalyticsPagesData, Filter } from 'src/app/shared/interfaces';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { Subscription } from 'rxjs';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-pages-numbers',
  templateUrl: './pages-numbers.component.html',
  styleUrls: ['./pages-numbers.component.css']
})
export class PagesNumbersComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  @ViewChild('tapTarget') tapTargetRef: ElementRef;

  aSub$: Subscription;
  tooltip: MaterialInstance;
  tapTarget: MaterialInstance;
  pages: AnalyticsPagesData[];
  filter: Filter = {};
  isFilterVisible = false;
  pending = false;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.getPosts();
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
    this.pages = [];
    this.pending = true;
    this.filter = filter;
    
    this.getPosts();
  }

  isFilter(): boolean {
    return Object.keys(this.filter).length !== 0; 
  }

  openInfo() {
    this.tapTarget.open();
  }

  getPosts() {
    const params = Object.assign({}, this.filter);

    this.aSub$ = this.analyticsService.getPagesNumbersData(params).subscribe(
      (data: AnalyticsPagesData[]) => {
        this.pages = data;

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  }

}
