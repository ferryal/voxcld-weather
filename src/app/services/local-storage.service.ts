import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly CITIES_KEY = 'weather-dashboard-cities';

  constructor() {}

  saveCities(cities: string[]): void {
    try {
      localStorage.setItem(this.CITIES_KEY, JSON.stringify(cities));
    } catch (error) {
      console.error('Error saving cities to localStorage:', error);
    }
  }

  getCities(): string[] {
    try {
      const cities = localStorage.getItem(this.CITIES_KEY);
      return cities ? JSON.parse(cities) : [];
    } catch (error) {
      console.error('Error retrieving cities from localStorage:', error);
      return [];
    }
  }

  addCity(city: string): void {
    const cities = this.getCities();
    if (!cities.includes(city)) {
      cities.push(city);
      this.saveCities(cities);
    }
  }

  removeCity(city: string): void {
    const cities = this.getCities();
    const updatedCities = cities.filter((c) => c !== city);
    this.saveCities(updatedCities);
  }

  clearAllCities(): void {
    try {
      localStorage.removeItem(this.CITIES_KEY);
    } catch (error) {
      console.error('Error clearing cities from localStorage:', error);
    }
  }
}
