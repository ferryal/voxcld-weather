import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityWeather } from '../../models/weather.interface';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  @Input() weather!: CityWeather;
  @Output() removeCity = new EventEmitter<string>();

  onRemove(): void {
    this.removeCity.emit(this.weather.id);
  }

  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
