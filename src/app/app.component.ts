import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherService } from './services/weather.service';
import { LocalStorageService } from './services/local-storage.service';
import { CityWeather } from './models/weather.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CitySearchComponent,
    WeatherCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Weather Dashboard';
  cities: CityWeather[] = [];

  constructor(
    private weatherService: WeatherService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadSavedCities();
  }

  onCityAdded(cityName: string): void {
    // Check if city already exists
    const existingCity = this.cities.find(
      (city) => city.city.toLowerCase() === cityName.toLowerCase()
    );

    if (existingCity) {
      alert('City already added to dashboard!');
      return;
    }

    // Create a temporary city object with loading state
    const tempCity: CityWeather = {
      id: `temp-${Date.now()}`,
      city: cityName,
      temperature: 0,
      condition: '',
      description: '',
      icon: '',
      country: '',
      humidity: 0,
      windSpeed: 0,
      isLoading: true,
    };

    this.cities.push(tempCity);

    // Fetch weather data
    this.weatherService.getCurrentWeather(cityName).subscribe({
      next: (weather) => {
        // Replace the temporary city with actual data
        const index = this.cities.findIndex((city) => city.id === tempCity.id);
        if (index !== -1) {
          this.cities[index] = weather;
          this.localStorageService.addCity(weather.city);
        }
      },
      error: (error) => {
        // Update the temporary city with error state
        const index = this.cities.findIndex((city) => city.id === tempCity.id);
        if (index !== -1) {
          this.cities[index] = {
            ...tempCity,
            isLoading: false,
            error: error,
          };
        }
      },
    });
  }

  onCityRemoved(cityId: string): void {
    const cityIndex = this.cities.findIndex((city) => city.id === cityId);
    if (cityIndex !== -1) {
      const cityName = this.cities[cityIndex].city;
      this.cities.splice(cityIndex, 1);
      this.localStorageService.removeCity(cityName);
    }
  }

  private loadSavedCities(): void {
    const savedCities = this.localStorageService.getCities();
    savedCities.forEach((cityName) => {
      this.onCityAdded(cityName);
    });
  }

  clearAllCities(): void {
    if (confirm('Are you sure you want to remove all cities?')) {
      this.cities = [];
      this.localStorageService.clearAllCities();
    }
  }

  trackByCity(index: number, city: CityWeather): string {
    return city.id;
  }
}
