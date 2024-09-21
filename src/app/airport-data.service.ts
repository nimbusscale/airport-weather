import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AirportDataService {
  constructor() { }

  getAirportWeatherForecast(airport_code: string) {
    console.log(airport_code)
  }
}


