import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-users-tree-filter',
  templateUrl: './users-tree-filter.component.html',
  styleUrls: ['./users-tree-filter.component.css']
})
export class UsersTreeFilterComponent implements OnInit {

  @Output() onFilter = new EventEmitter<Filter>();

  top: number;
  isValid = true;

  constructor() { }

  ngOnInit(): void {
  }

  submitFilter() {
    const filter: Filter = {};

    if (this.top) {
      filter.top = this.top;
    }

    this.onFilter.emit(filter);
  }

}
