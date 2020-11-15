import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VkPostsPageComponent } from './vk-posts-page.component';

describe('VkPostsPageComponent', () => {
  let component: VkPostsPageComponent;
  let fixture: ComponentFixture<VkPostsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VkPostsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VkPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
