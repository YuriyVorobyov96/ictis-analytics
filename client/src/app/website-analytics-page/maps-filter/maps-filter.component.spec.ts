import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsFilterComponent } from './maps-filter.component';

describe('MapsFilterComponent', () => {
  let component: MapsFilterComponent;
  let fixture: ComponentFixture<MapsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
