import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectButtonComponent } from './reflect-button.component';

describe('ReflectButtonComponent', () => {
  let component: ReflectButtonComponent;
  let fixture: ComponentFixture<ReflectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReflectButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReflectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
