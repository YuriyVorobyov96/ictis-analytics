import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VkUsersPageComponent } from './vk-users-page.component';

describe('VkUsersPageComponent', () => {
  let component: VkUsersPageComponent;
  let fixture: ComponentFixture<VkUsersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VkUsersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VkUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
