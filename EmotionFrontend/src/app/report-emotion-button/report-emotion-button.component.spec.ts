import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmotionButtonComponent } from './report-emotion-button.component';

describe('ReportEmotionButtonComponent', () => {
  let component: ReportEmotionButtonComponent;
  let fixture: ComponentFixture<ReportEmotionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportEmotionButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportEmotionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
