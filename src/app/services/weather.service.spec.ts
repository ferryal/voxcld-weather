import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { WeatherData, CityWeather } from '../models/weather.interface';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const mockWeatherData: WeatherData = {
    id: 2643743,
    name: 'London',
    main: {
      temp: 15.5,
      feels_like: 14.2,
      temp_min: 12.0,
      temp_max: 18.0,
      pressure: 1013,
      humidity: 72,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    wind: {
      speed: 3.5,
      deg: 180,
    },
    clouds: {
      all: 0,
    },
    sys: {
      country: 'GB',
      sunrise: 1640000000,
      sunset: 1640030000,
    },
    dt: 1640015000,
    timezone: 0,
    cod: 200,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentWeather', () => {
    it('should fetch weather data for a city', () => {
      const cityName = 'London';
      const expectedUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cb1458bd084ed663910617c67772dc26&units=metric`;

      service.getCurrentWeather(cityName).subscribe((weather: CityWeather) => {
        expect(weather).toBeTruthy();
        expect(weather.city).toBe('London');
        expect(weather.temperature).toBe(16); // rounded from 15.5
        expect(weather.condition).toBe('Clear');
        expect(weather.description).toBe('clear sky');
        expect(weather.icon).toBe('01d');
        expect(weather.country).toBe('GB');
        expect(weather.humidity).toBe(72);
        expect(weather.windSpeed).toBe(3.5);
        expect(weather.id).toContain('2643743-');
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockWeatherData);
    });

    it('should handle 404 error for city not found', () => {
      const cityName = 'NonExistentCity';
      const expectedUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cb1458bd084ed663910617c67772dc26&units=metric`;

      service.getCurrentWeather(cityName).subscribe({
        next: () => fail('Expected an error'),
        error: (error) => {
          expect(error).toBe(
            'City not found. Please check the spelling and try again.'
          );
        },
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });

    it('should handle 401 error for invalid API key', () => {
      const cityName = 'London';
      const expectedUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cb1458bd084ed663910617c67772dc26&units=metric`;

      service.getCurrentWeather(cityName).subscribe({
        next: () => fail('Expected an error'),
        error: (error) => {
          expect(error).toBe('Invalid API key.');
        },
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    });

    it('should handle 429 error for too many requests', () => {
      const cityName = 'London';
      const expectedUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cb1458bd084ed663910617c67772dc26&units=metric`;

      service.getCurrentWeather(cityName).subscribe({
        next: () => fail('Expected an error'),
        error: (error) => {
          expect(error).toBe('Too many requests. Please try again later.');
        },
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush('Too Many Requests', {
        status: 429,
        statusText: 'Too Many Requests',
      });
    });

    it('should handle generic server errors', () => {
      const cityName = 'London';
      const expectedUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cb1458bd084ed663910617c67772dc26&units=metric`;

      service.getCurrentWeather(cityName).subscribe({
        next: () => fail('Expected an error'),
        error: (error) => {
          expect(error).toContain('Error Code: 500');
        },
      });

      const req = httpMock.expectOne(expectedUrl);
      req.flush('Internal Server Error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('getForecast', () => {
    it('should fetch forecast data for a city', () => {
      const cityName = 'London';
      const expectedUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=cb1458bd084ed663910617c67772dc26&units=metric`;
      const mockForecastData = {
        list: [
          {
            dt: 1640015000,
            main: { temp: 15.5, temp_min: 12.0, temp_max: 18.0 },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            dt_txt: '2021-12-20 15:00:00',
          },
        ],
        city: { name: 'London', country: 'GB' },
      };

      service.getForecast(cityName).subscribe((forecast) => {
        expect(forecast).toBeTruthy();
        expect(forecast.city.name).toBe('London');
        expect(forecast.list.length).toBe(1);
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockForecastData);
    });
  });
});
