import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersChartComponent } from './users-chart.component';

describe('UsersChartComponent', () => {
  let component: UsersChartComponent;
  let fixture: ComponentFixture<UsersChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
