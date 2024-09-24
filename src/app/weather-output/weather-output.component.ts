import {Component, Input} from '@angular/core';
import {WeatherCardComponent} from "../weather-card/weather-card.component";

@Component({
  selector: 'app-weather-output',
  standalone: true,
  imports: [WeatherCardComponent],
  templateUrl: './weather-output.component.html',
  styleUrl: './weather-output.component.scss'
})
export class WeatherOutputComponent {
  @Input() weatherCards: WeatherCardComponent[] = []
}
