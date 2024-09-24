import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AirportWeatherService} from "../airport-weather.service";
import {Weather} from "../weather";

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
  private airportWeatherService: AirportWeatherService = inject(AirportWeatherService)
  searchText: string = ''
  private weatherData: Weather[] = []

  @Output() airportWeather: EventEmitter<Weather[]> = new EventEmitter<Weather[]>();

  constructor() {
  }

  async getAirportWeatherForecast(airport_code: string): Promise<void> {
    this.weatherData = await this.airportWeatherService.getWeatherDataForAirport(airport_code)
    this.airportWeather.emit(this.weatherData)
  }
}
