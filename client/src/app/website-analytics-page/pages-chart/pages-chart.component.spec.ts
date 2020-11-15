import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesChartComponent } from './pages-chart.component';

describe('PagesChartComponent', () => {
  let component: PagesChartComponent;
  let fixture: ComponentFixture<PagesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
