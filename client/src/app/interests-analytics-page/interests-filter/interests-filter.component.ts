import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialService, MaterialDatepicker } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-interests-filter',
  templateUrl: './interests-filter.component.html',
  styleUrls: ['./interests-filter.component.css']
})
export class InterestsFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>();

  top: number;
  isValid = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  submitFilter() {
    const filter: Filter = {};

    if (this.top) {
      filter.top = this.top;
    }

    this.onFilter.emit(filter);
  }

}
