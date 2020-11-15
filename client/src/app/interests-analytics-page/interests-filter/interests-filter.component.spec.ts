import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsFilterComponent } from './interests-filter.component';

describe('InterestsFilterComponent', () => {
  let component: InterestsFilterComponent;
  let fixture: ComponentFixture<InterestsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
