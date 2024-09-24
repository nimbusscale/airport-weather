import {Component, EventEmitter, Output} from '@angular/core';
import {SearchBoxComponent} from "../search-box/search-box.component";
import {Weather} from "../weather";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBoxComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() airportWeather: EventEmitter<Weather[]> = new EventEmitter<Weather[]>();

  onWeatherDataReceived(weatherData: Weather[]) {
    this.airportWeather.emit(weatherData)
  }
}
