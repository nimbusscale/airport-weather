import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {WeatherOutputComponent} from "./weather-output/weather-output.component";
import {Weather} from "./weather";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, WeatherOutputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  airportWeather: Weather[] = []
  onWeatherDataReceived(weatherData: Weather[]) {
      this.airportWeather = weatherData
  }
}
