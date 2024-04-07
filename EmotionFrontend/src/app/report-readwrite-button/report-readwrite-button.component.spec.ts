import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReadwriteButtonComponent } from './report-readwrite-button.component';

describe('ReportReadwriteButtonComponent', () => {
  let component: ReportReadwriteButtonComponent;
  let fixture: ComponentFixture<ReportReadwriteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportReadwriteButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportReadwriteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
