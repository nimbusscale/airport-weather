import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { Weather } from './weather';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private apiKey = '8c119b0c37d4ab29ca5f676c04f4ea3d';
  private apiURL = 'https://api.openweathermap.org/data/3.0/onecall/day_summary';

  constructor(private http: HttpClient) {}

  private getUpcomingDates(days: number): string[] {
    const dates: string[] = [];
    const today = dayjs();
    for (let i = 1; i <= days; i++) {
      dates.push(today.add(i, 'days').format('YYYY-MM-DD'));
    }
    return dates;
  }

  private getWeatherDataForDate(date: string, lat: string, lon: string): Promise<Weather> {
    const params = new HttpParams()
      .append('lat', lat)
      .append('lon', lon)
      .append('date', date)
      .append('appid', this.apiKey);

    return lastValueFrom(this.http.get<Weather>(this.apiURL, { params: params }));
  }

  async getWeatherDataForUpcomingDates(lat: string, lon: string, days = 3): Promise<Weather[]> {
    const upcomingDates = this.getUpcomingDates(days);
    const weatherPromises = upcomingDates.map((date) => this.getWeatherDataForDate(date, lat, lon));
    return await Promise.all(weatherPromises);
  }
}
