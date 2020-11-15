import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationStatusComponent } from './education-status.component';

describe('EducationStatusComponent', () => {
  let component: EducationStatusComponent;
  let fixture: ComponentFixture<EducationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
