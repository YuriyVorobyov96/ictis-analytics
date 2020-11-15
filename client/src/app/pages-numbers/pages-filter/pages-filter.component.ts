import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialService, MaterialDatepicker } from 'src/app/shared/classes/material.service';
@Component({
  selector: 'app-pages-filter',
  templateUrl: './pages-filter.component.html',
  styleUrls: ['./pages-filter.component.css']
})
export class PagesFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('selectSort') selectSortRef: ElementRef;
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;

  title: string;
  url: string;
  selectSort: MaterialDatepicker;
  selectedSortOption: number;
  start: MaterialDatepicker;
  end: MaterialDatepicker;
  isValid = true;

  sortings = [
    {
      name: 'Сортировка по возрастанию',
      value: 1,
    },
    {
      name: 'Сортировка по убыванию',
      value: -1,
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.selectSort.destroy();
    this.start.destroy();
  }

  ngAfterViewInit() {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this));
    this.selectSort = MaterialService.initSelect(this.selectSortRef);
  }

  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;

      return;
    }

    this.isValid = this.start.date <= this.end.date;
  }

  submitFilter() {
    const filter: Filter = {};

    if (this.title) {
      filter.title = this.title;
    }
    if (this.url) {
      filter.path = this.url;
    }
    if (this.selectedSortOption) {
      filter.sort = this.selectedSortOption;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.onFilter.emit(filter);
  }

}
