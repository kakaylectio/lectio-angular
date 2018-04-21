import { TestBed, inject } from '@angular/core/testing';

import { TopicCacheService } from './topic-cache.service';

describe('TopicCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicCacheService]
    });
  });

  it('should be created', inject([TopicCacheService], (service: TopicCacheService) => {
    expect(service).toBeTruthy();
  }));
});
