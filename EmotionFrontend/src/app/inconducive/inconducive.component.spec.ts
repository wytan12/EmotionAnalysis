import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconduciveComponent } from './inconducive.component';

describe('InconduciveComponent', () => {
  let component: InconduciveComponent;
  let fixture: ComponentFixture<InconduciveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InconduciveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InconduciveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
