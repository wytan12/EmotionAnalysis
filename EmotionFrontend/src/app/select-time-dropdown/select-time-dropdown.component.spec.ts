import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTimeDropdownComponent } from './select-time-dropdown.component';

describe('SelectTimeDropdownComponent', () => {
  let component: SelectTimeDropdownComponent;
  let fixture: ComponentFixture<SelectTimeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTimeDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectTimeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
