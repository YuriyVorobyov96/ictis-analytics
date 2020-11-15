import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialService, MaterialDatepicker } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-numbers-filter',
  templateUrl: './numbers-filter.component.html',
  styleUrls: ['./numbers-filter.component.css']
})
export class NumbersFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;
  @ViewChild('selectType') selectTypeRef: ElementRef;

  top: number;
  selectType: MaterialDatepicker;
  selectedTypeOption: string;
  start: MaterialDatepicker;
  end: MaterialDatepicker;
  isValid = true;

  types = [
    {
      name: 'Вертикальная диаграмма',
      value: 'bar',
    },
    {
      name: 'Горизонтальная диаграмма',
      value: 'horizontalBar',
    },
    {
      name: 'Круговая диаграмма',
      value: 'pie',
    },
    {
      name: 'Полярный график',
      value: 'polarArea',
    },
    {
      name: 'Линейный график',
      value: 'line',
    },
    {
      name: 'Лепестковая диаграмма',
      value: 'radar',
    },
    {
      name: 'Кольцевая диаграмма',
      value: 'doughnut',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.start.destroy();
    this.selectType.destroy();
  }

  ngAfterViewInit() {
    this.start = MaterialService.initDatePicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatePicker(this.endRef, this.validate.bind(this));
    this.selectType = MaterialService.initSelect(this.selectTypeRef);
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

    if (this.top) {
      filter.top = this.top;
    }
    if (this.start.date) {
      filter.start = this.start.date;
    }
    if (this.end.date) {
      filter.end = this.end.date;
    }
    if (this.selectedTypeOption) {
      filter.type = this.selectedTypeOption;
    }

    this.onFilter.emit(filter);
  }

}
