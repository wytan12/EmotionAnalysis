import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGuideButtonComponent } from './user-guide-button.component';

describe('UserGuideButtonComponent', () => {
  let component: UserGuideButtonComponent;
  let fixture: ComponentFixture<UserGuideButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGuideButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGuideButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
