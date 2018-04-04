import { TestBed, inject } from '@angular/core/testing';

import { LectioBackendServiceService } from './lectio-backend-service.service';

describe('LectioBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectioBackendService]
    });
  });

  it('should be created', inject([LectioBackendService], (service: LectioBackendService) => {
    expect(service).toBeTruthy();
  }));
});
