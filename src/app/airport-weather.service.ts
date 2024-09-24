import { Injectable } from '@angular/core';
import { AirportDataService } from './airport-data.service';
import { WeatherDataService } from './weather-data.service';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root',
})
export class AirportWeatherService {
  constructor(
    private airportData: AirportDataService,
    private weatherData: WeatherDataService,
  ) {}

  getWeatherDataForAirport(airport_code: string): Promise<Weather[]> {
    return this.airportData
      .getAirportData(airport_code)
      .then((airport) => {
        return this.weatherData.getWeatherDataForUpcomingDates(airport.lat, airport.long);
      })
      .catch((error: unknown) => {
        console.error(`Error getting weather data for airport ${airport_code}:`, error);
        throw error;
      });
  }
}
