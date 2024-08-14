import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNoteratingComponent } from './test-noterating.component';

describe('TestNoteratingComponent', () => {
  let component: TestNoteratingComponent;
  let fixture: ComponentFixture<TestNoteratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNoteratingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestNoteratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
