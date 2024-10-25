import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectionTitleComponent } from './reflection-title.component';

describe('ReflectionTitleComponent', () => {
  let component: ReflectionTitleComponent;
  let fixture: ComponentFixture<ReflectionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReflectionTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReflectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
