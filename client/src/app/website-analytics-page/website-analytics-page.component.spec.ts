import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteAnalyticsPageComponent } from './website-analytics-page.component';

describe('WebsiteAnalyticsPageComponent', () => {
  let component: WebsiteAnalyticsPageComponent;
  let fixture: ComponentFixture<WebsiteAnalyticsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteAnalyticsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteAnalyticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
