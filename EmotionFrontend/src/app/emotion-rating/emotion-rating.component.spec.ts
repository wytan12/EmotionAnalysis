import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionRatingComponent } from './emotion-rating.component';

describe('EmotionRatingComponent', () => {
  let component: EmotionRatingComponent;
  let fixture: ComponentFixture<EmotionRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmotionRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmotionRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
