import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairComponent } from './chair.component';

describe('ChairComponent', () => {
  let component: ChairComponent;
  let fixture: ComponentFixture<ChairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
