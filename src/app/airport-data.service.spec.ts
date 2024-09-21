import { TestBed } from '@angular/core/testing';

import { AirportDataService } from './airport-data.service';

describe('AirportDataService', () => {
  let service: AirportDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
