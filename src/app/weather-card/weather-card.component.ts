import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  @Input() date!: string
  @Input() high!: number
  @Input() low!: number
}
