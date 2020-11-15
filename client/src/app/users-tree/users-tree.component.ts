import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { AnalyticsUsersTreeData, Filter } from 'src/app/shared/interfaces';
import sigma from 'sigma';

@Component({
  selector: 'app-users-tree',
  templateUrl: './users-tree.component.html',
  styleUrls: ['./users-tree.component.css']
})
export class UsersTreeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef;
  @ViewChild("UsersTree", { static: true }) UsersTree: ElementRef;

  tooltip: MaterialInstance;
  aSub$: Subscription;
  private sigma: any;
  filter: Filter = {};
  graph;
  pending = true;
  isFilterVisible = false;
  params: any = {
    top: 10,
  }

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.aSub$) {
      this.aSub$.unsubscribe();
    }
    this.tooltip.destroy();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
    this.graphCreator();
  }

  applyFilter(filter: Filter) {
    this.pending = true;
    this.filter = filter;

    if (filter.top) {
      this.params.top = filter.top
    }
    
    this.sigma.kill();
    this.graphCreator();
  }

  isFilter(): boolean {
    return Object.keys(this.filter).length !== 0; 
  }

  graphCreator() {
    this.aSub$ = this.analyticsService.getUsersTreeData(this.params).subscribe(
      (data: AnalyticsUsersTreeData) => {
        this.graph = data;

        this.pending = false;

        this.sigma = new sigma(
          {
             renderer: {
               container: this.UsersTree.nativeElement,
               type: 'canvas',
             },
             settings: {
              edgeColor: 'default',
              defaultNodeColor: 'rgba(224, 65, 65, 0.9)',
              defaultEdgeColor: '#4fc3f7',
              font: "calibri",
              labelSize: "proportional",
              boderSize: 1,
              sideMargin: 20,
              zoomMax: 1,
              minArrowSize: 10,
              // scalingMode: 'outside',
             }
           }
         );
    
        this.sigma.graph.read(this.graph);
        this.sigma.cameras[0].goTo({ x: 0, y: 0, angle: 0, ratio: 0.8 });
        this.sigma.refresh();
      },
      err => {
        console.warn(err);
        MaterialService.toast(err.error.message);
      }
    )
  }
}
