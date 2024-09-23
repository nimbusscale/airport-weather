import {Component, inject} from '@angular/core';
import {AirportDataService} from "../airport-data.service";
import {FormsModule} from "@angular/forms";
import {WeatherDataService} from "../weather-data.service";
import {AirportWeatherService} from "../airport-weather.service";

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  private airportWeather: AirportWeatherService = inject(AirportWeatherService)
  searchText: string = ''

  constructor() {
  }

  getAirportWeatherForecast(airport_code: string) {
    this.airportWeather.getWeatherDataForAirport(airport_code)
  }

}
