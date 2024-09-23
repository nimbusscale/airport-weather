import { Injectable } from '@angular/core';
import {AirportDataService} from "./airport-data.service";
import {WeatherDataService} from "./weather-data.service";

@Injectable({
  providedIn: 'root'
})
export class AirportWeatherService {

  constructor(
    private airportData: AirportDataService,
    private weatherData: WeatherDataService
  ) { }

  getWeatherDataForAirport(airport_code: string): void {
    this.airportData.getAirportData(airport_code).then(
      (airport) => {
        this.weatherData.getWeatherDataForUpcomingDates(airport.lat, airport.long)
      }
    )
  }

}
