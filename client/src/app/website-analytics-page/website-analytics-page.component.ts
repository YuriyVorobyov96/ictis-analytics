import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialService, MaterialInstance } from '../shared/classes/material.service';

@Component({
  selector: 'app-website-analytics-page',
  templateUrl: './website-analytics-page.component.html',
  styleUrls: ['./website-analytics-page.component.css']
})
export class WebsiteAnalyticsPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef: ElementRef;

  tapTarget: MaterialInstance;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.tapTarget.destroy();
  }
  
  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  openInfo() {
    this.tapTarget.open();
  }
}
