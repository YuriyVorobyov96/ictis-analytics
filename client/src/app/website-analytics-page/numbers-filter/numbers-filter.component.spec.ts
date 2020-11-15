import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersFilterComponent } from './numbers-filter.component';

describe('NumbersFilterComponent', () => {
  let component: NumbersFilterComponent;
  let fixture: ComponentFixture<NumbersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbersFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
