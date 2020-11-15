import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesChartComponent } from './countries-chart.component';

describe('CountriesChartComponent', () => {
  let component: CountriesChartComponent;
  let fixture: ComponentFixture<CountriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
