import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTreeFilterComponent } from './users-tree-filter.component';

describe('UsersTreeFilterComponent', () => {
  let component: UsersTreeFilterComponent;
  let fixture: ComponentFixture<UsersTreeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTreeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTreeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
