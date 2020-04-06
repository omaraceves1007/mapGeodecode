import { TestBed } from '@angular/core/testing';

import { GeodecodeService } from './geodecode.service';

describe('GeodecodeService', () => {
  let service: GeodecodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeodecodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
