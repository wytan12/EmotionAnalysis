import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartJerrisonapiComponent } from './radar-chart-jerrisonapi.component';

describe('RadarChartJerrisonapiComponent', () => {
  let component: RadarChartJerrisonapiComponent;
  let fixture: ComponentFixture<RadarChartJerrisonapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarChartJerrisonapiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadarChartJerrisonapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
