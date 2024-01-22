import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyReasonComponent } from './survey-reason.component';

describe('SurveyReasonComponent', () => {
  let component: SurveyReasonComponent;
  let fixture: ComponentFixture<SurveyReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
