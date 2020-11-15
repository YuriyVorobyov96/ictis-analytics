import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsChartComponent } from './sessions-chart.component';

describe('SessionsChartComponent', () => {
  let component: SessionsChartComponent;
  let fixture: ComponentFixture<SessionsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
