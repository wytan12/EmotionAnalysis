import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectHistoryComponent } from './reflect-history.component';

describe('ReflectHistoryComponent', () => {
  let component: ReflectHistoryComponent;
  let fixture: ComponentFixture<ReflectHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReflectHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReflectHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
