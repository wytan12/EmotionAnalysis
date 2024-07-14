import { TestBed } from '@angular/core/testing';

import { NoteVisibilityService } from './note-visibility.service';

describe('NoteVisibilityService', () => {
  let service: NoteVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
