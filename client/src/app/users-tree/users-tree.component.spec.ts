import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTreeComponent } from './users-tree.component';

describe('UsersTreeComponent', () => {
  let component: UsersTreeComponent;
  let fixture: ComponentFixture<UsersTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
