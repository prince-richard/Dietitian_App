import { TestBed, inject } from '@angular/core/testing';

import { RmtestService } from './rmtest.service';

describe('RmtestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RmtestService]
    });
  });

  it('should be created', inject([RmtestService], (service: RmtestService) => {
    expect(service).toBeTruthy();
  }));
});
