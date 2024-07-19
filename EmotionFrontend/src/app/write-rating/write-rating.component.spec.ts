import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteRatingComponent } from './write-rating.component';

describe('WriteRatingComponent', () => {
  let component: WriteRatingComponent;
  let fixture: ComponentFixture<WriteRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WriteRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
