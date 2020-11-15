import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesChartComponent } from './cities-chart.component';

describe('CitiesChartComponent', () => {
  let component: CitiesChartComponent;
  let fixture: ComponentFixture<CitiesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
