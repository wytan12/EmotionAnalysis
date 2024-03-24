import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionSliderComponent } from './emotion-slider.component';

describe('EmotionSliderComponent', () => {
  let component: EmotionSliderComponent;
  let fixture: ComponentFixture<EmotionSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmotionSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmotionSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
