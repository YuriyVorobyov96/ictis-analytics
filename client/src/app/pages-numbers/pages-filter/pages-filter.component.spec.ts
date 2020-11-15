import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesFilterComponent } from './pages-filter.component';

describe('PagesFilterComponent', () => {
  let component: PagesFilterComponent;
  let fixture: ComponentFixture<PagesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
