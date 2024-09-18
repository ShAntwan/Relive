import { TestBed } from '@angular/core/testing';

import { SystemRecommendationService } from './system-recommendation.service';

describe('SystemRecommendationService', () => {
  let service: SystemRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
