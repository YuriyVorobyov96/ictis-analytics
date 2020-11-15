import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsChartComponent } from './regions-chart.component';

describe('RegionsChartComponent', () => {
  let component: RegionsChartComponent;
  let fixture: ComponentFixture<RegionsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
