import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';
import { MaterialService, MaterialDatepicker } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.css']
})
export class PostsFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>();
  @ViewChild('selectType') selectTypeRef: ElementRef;
  @ViewChild('selectLabel') selectLabelRef: ElementRef;

  top: number;
  selectType: MaterialDatepicker;
  selectLabel: MaterialDatepicker;
  selectedTypeOption: string;
  selectedLabelOption: string;
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

  labels = [
    {
      name: 'Число просмотров',
      value: 'Просмотры',
    },
    {
      name: 'Число лайков',
      value: 'Лайки',
    },
    {
      name: 'Число репостов',
      value: 'Репосты',
    },
    {
      name: 'Число комментариев',
      value: 'Комментарии',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.selectType.destroy();
    this.selectLabel.destroy();
  }

  ngAfterViewInit() {
    this.selectType = MaterialService.initSelect(this.selectTypeRef);
    this.selectLabel = MaterialService.initSelect(this.selectLabelRef);
  }

  submitFilter() {
    const filter: Filter = {};

    if (this.top) {
      filter.top = this.top;
    }
    if (this.selectedTypeOption) {
      filter.type = this.selectedTypeOption;
    }
    if (this.selectedLabelOption) {
      filter.label = this.selectedLabelOption;
    }

    this.onFilter.emit(filter);
  }

}
