import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensityDropdownComponent } from './intensity-dropdown.component';

describe('IntensityDropdownComponent', () => {
  let component: IntensityDropdownComponent;
  let fixture: ComponentFixture<IntensityDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntensityDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntensityDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
