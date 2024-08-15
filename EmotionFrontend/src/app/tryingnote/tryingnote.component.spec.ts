import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryingnoteComponent } from './tryingnote.component';

describe('TryingnoteComponent', () => {
  let component: TryingnoteComponent;
  let fixture: ComponentFixture<TryingnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TryingnoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TryingnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
