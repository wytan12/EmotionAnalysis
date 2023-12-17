import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectFormComponent } from './reflect-form.component';

describe('ReflectFormComponent', () => {
  let component: ReflectFormComponent;
  let fixture: ComponentFixture<ReflectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReflectFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReflectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
