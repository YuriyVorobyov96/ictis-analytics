import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesNumbersComponent } from './pages-numbers.component';

describe('PagesNumbersComponent', () => {
  let component: PagesNumbersComponent;
  let fixture: ComponentFixture<PagesNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
