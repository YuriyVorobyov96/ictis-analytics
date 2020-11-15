import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsAnalyticsPageComponent } from './interests-analytics-page.component';

describe('InterestsAnalyticsPageComponent', () => {
  let component: InterestsAnalyticsPageComponent;
  let fixture: ComponentFixture<InterestsAnalyticsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestsAnalyticsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsAnalyticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
