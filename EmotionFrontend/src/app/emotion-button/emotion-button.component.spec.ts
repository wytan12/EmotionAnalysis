import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionButtonComponent } from './emotion-button.component';

describe('EmotionButtonComponent', () => {
  let component: EmotionButtonComponent;
  let fixture: ComponentFixture<EmotionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmotionButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmotionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
