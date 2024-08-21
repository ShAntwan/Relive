import { TestBed } from '@angular/core/testing';

import { UserMeasurementsService } from './user-measurements.service';

describe('UserMeasurementsService', () => {
  let service: UserMeasurementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMeasurementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
