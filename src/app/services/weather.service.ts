import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  WeatherData,
  CityWeather,
  ForecastData,
} from '../models/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly API_KEY = 'cb1458bd084ed663910617c67772dc26';
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<CityWeather> {
    const url = `${this.BASE_URL}/weather?q=${city}&appid=${this.API_KEY}&units=metric`;

    return this.http.get<WeatherData>(url).pipe(
      map((data) => this.transformWeatherData(data)),
      catchError(this.handleError)
    );
  }

  getForecast(city: string): Observable<ForecastData> {
    const url = `${this.BASE_URL}/forecast?q=${city}&appid=${this.API_KEY}&units=metric`;

    return this.http.get<ForecastData>(url).pipe(catchError(this.handleError));
  }

  private transformWeatherData(data: WeatherData): CityWeather {
    return {
      id: `${data.id}-${Date.now()}`,
      city: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      country: data.sys.country,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 404:
          errorMessage =
            'City not found. Please check the spelling and try again.';
          break;
        case 401:
          errorMessage = 'Invalid API key.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    return throwError(() => errorMessage);
  }
}
