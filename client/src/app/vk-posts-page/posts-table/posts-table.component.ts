import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AnalyticsPageVkPosts, Filter } from 'src/app/shared/interfaces';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { Subscription } from 'rxjs';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;

  aSub$: Subscription;
  tooltip: MaterialInstance;
  posts: AnalyticsPageVkPosts[];
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
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  applyFilter(filter: Filter) {
    this.posts = [];
    this.pending = true;
    this.filter = filter;
    
    this.getPosts();
  }

  isFilter(): boolean {
    return Object.keys(this.filter).length !== 0; 
  }

  getPosts() {
    const params = Object.assign({}, this.filter);

    this.aSub$ = this.analyticsService.getAnalyticsVKPosts(params).subscribe(
      (data: AnalyticsPageVkPosts[]) => {
        this.posts = data;

        this.pending = false;
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  }

}
