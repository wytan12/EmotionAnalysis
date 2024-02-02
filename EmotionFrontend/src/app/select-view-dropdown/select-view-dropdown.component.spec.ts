import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectViewDropdownComponent } from './select-view-dropdown.component';

describe('SelectViewDropdownComponent', () => {
  let component: SelectViewDropdownComponent;
  let fixture: ComponentFixture<SelectViewDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectViewDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectViewDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
