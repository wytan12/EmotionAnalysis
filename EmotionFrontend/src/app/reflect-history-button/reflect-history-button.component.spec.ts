import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectHistoryButtonComponent } from './reflect-history-button.component';

describe('ReflectHistoryButtonComponent', () => {
  let component: ReflectHistoryButtonComponent;
  let fixture: ComponentFixture<ReflectHistoryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReflectHistoryButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReflectHistoryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
