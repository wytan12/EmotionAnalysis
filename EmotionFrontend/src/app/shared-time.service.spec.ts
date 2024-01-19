import { TestBed } from '@angular/core/testing';

import { SharedTimeService } from './shared-time.service';

describe('SharedTimeService', () => {
  let service: SharedTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
