import { TestBed } from '@angular/core/testing';

import { AirportWeatherService } from './airport-weather.service';

describe('AirportWeatherService', () => {
  let service: AirportWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
