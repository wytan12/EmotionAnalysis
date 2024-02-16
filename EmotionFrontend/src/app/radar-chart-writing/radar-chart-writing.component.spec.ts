import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartWritingComponent } from './radar-chart-writing.component';

describe('RadarChartWritingComponent', () => {
  let component: RadarChartWritingComponent;
  let fixture: ComponentFixture<RadarChartWritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarChartWritingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadarChartWritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
