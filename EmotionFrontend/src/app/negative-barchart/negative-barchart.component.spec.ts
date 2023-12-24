import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativeBarchartComponent } from './negative-barchart.component';

describe('NegativeBarchartComponent', () => {
  let component: NegativeBarchartComponent;
  let fixture: ComponentFixture<NegativeBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegativeBarchartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NegativeBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
