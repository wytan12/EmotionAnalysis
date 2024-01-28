import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMemberDropdownComponent } from './select-member-dropdown.component';

describe('SelectMemberDropdownComponent', () => {
  let component: SelectMemberDropdownComponent;
  let fixture: ComponentFixture<SelectMemberDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMemberDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectMemberDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
