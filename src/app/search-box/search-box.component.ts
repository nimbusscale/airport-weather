import {Component, inject} from '@angular/core';
import {AirportDataService} from "../airport-data.service";
import {FormsModule} from "@angular/forms";

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
  private airportDataService: AirportDataService = inject(AirportDataService)
  searchText: string = ''

  constructor() {
  }

  getAirportWeatherForecast(airport_code: string) {
    this.airportDataService.getAirportWeatherForecast(airport_code)
  }

}
