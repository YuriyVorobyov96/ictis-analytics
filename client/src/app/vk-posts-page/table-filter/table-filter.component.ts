import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialService, MaterialDatepicker } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('selectValue') selectValueRef: ElementRef;
  @ViewChild('selectSort') selectSortRef: ElementRef;

  id: number;
  selectValue: MaterialDatepicker;
  selectedValueOption: string;
  selectSort: MaterialDatepicker;
  selectedSortOption: number;
  isValid = true;

  values = [
    {
      name: 'id',
      value: 'id',
    },
    {
      name: 'Дата',
      value: 'date',
    },
    {
      name: 'Лайки',
      value: 'likesCount',
    },
    {
      name: 'Репосты',
      value: 'repostsCount',
    },
    {
      name: 'Комментарии',
      value: 'commentsCount',
    },
    {
      name: 'Просмотры',
      value: 'viewsCount',
    },
  ]

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
    this.selectValue.destroy();
    this.selectSort.destroy();
  }

  ngAfterViewInit() {
    this.selectValue = MaterialService.initSelect(this.selectValueRef);
    this.selectSort = MaterialService.initSelect(this.selectSortRef);
  }

  submitFilter() {
    const filter: Filter = {};

    if (this.id) {
      filter.id = this.id;
    }
    if (this.selectedValueOption) {
      filter.query = this.selectedValueOption;
      filter.sort = -1;
    }
    if (this.selectedSortOption) {
      filter.query = 'id';
      filter.sort = this.selectedSortOption;
    }
    if (this.selectedValueOption && this.selectedSortOption) {
      filter.query = this.selectedValueOption;
      filter.sort = this.selectedSortOption;
    }

    this.onFilter.emit(filter);
  }

}
