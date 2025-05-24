import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WeatherCardComponent } from './weather-card.component';
import { CityWeather } from '../../models/weather.interface';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  const mockWeatherData: CityWeather = {
    id: 'test-id-123',
    city: 'London',
    temperature: 15,
    condition: 'Clear',
    description: 'clear sky',
    icon: '01d',
    country: 'GB',
    humidity: 72,
    windSpeed: 3.5,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardComponent, LoadingSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.weather = mockWeatherData;
    expect(component).toBeTruthy();
  });

  describe('Weather Display', () => {
    beforeEach(() => {
      component.weather = mockWeatherData;
      fixture.detectChanges();
    });

    it('should display city name and country', () => {
      const cityElement = fixture.debugElement.query(By.css('h3'));
      const countryElement = fixture.debugElement.query(By.css('p'));

      expect(cityElement.nativeElement.textContent.trim()).toBe('London');
      expect(countryElement.nativeElement.textContent.trim()).toBe('GB');
    });

    it('should display temperature', () => {
      const tempElement = fixture.debugElement.query(By.css('.text-3xl'));
      expect(tempElement.nativeElement.textContent.trim()).toBe('15°C');
    });

    it('should display weather description', () => {
      const descElement = fixture.debugElement.query(By.css('.capitalize'));
      expect(descElement.nativeElement.textContent.trim()).toBe('clear sky');
    });

    it('should display humidity and wind speed', () => {
      const humidityElements = fixture.debugElement.queryAll(
        By.css('.font-semibold')
      );
      expect(humidityElements[0].nativeElement.textContent.trim()).toBe('72%');
      expect(humidityElements[1].nativeElement.textContent.trim()).toBe(
        '3.5 m/s'
      );
    });

    it('should display weather icon with correct src', () => {
      const iconElement = fixture.debugElement.query(By.css('img'));
      expect(iconElement.nativeElement.src).toBe(
        'https://openweathermap.org/img/wn/01d@2x.png'
      );
      expect(iconElement.nativeElement.alt).toBe('clear sky');
    });

    it('should have remove button', () => {
      const removeButton = fixture.debugElement.query(
        By.css('button[title="Remove city"]')
      );
      expect(removeButton).toBeTruthy();
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      component.weather = { ...mockWeatherData, isLoading: true };
      fixture.detectChanges();
    });

    it('should display loading spinner when isLoading is true', () => {
      const loadingSpinner = fixture.debugElement.query(
        By.css('app-loading-spinner')
      );
      expect(loadingSpinner).toBeTruthy();
    });

    it('should display loading message', () => {
      const loadingMessage = fixture.debugElement.query(By.css('p'));
      expect(loadingMessage.nativeElement.textContent.trim()).toBe(
        'Loading weather data...'
      );
    });

    it('should not display weather content when loading', () => {
      const weatherContent = fixture.debugElement.query(By.css('.text-3xl'));
      expect(weatherContent).toBeFalsy();
    });
  });

  describe('Error State', () => {
    beforeEach(() => {
      component.weather = {
        ...mockWeatherData,
        isLoading: false,
        error: 'City not found. Please check the spelling and try again.',
      };
      fixture.detectChanges();
    });

    it('should display error message', () => {
      const errorMessage = fixture.debugElement.query(By.css('.text-red-600'));
      expect(errorMessage.nativeElement.textContent.trim()).toBe(
        'City not found. Please check the spelling and try again.'
      );
    });

    it('should display error icon', () => {
      const errorIcon = fixture.debugElement.query(By.css('.text-red-500 svg'));
      expect(errorIcon).toBeTruthy();
    });

    it('should have remove button in error state', () => {
      const removeButton = fixture.debugElement.query(By.css('.bg-red-500'));
      expect(removeButton).toBeTruthy();
      expect(removeButton.nativeElement.textContent.trim()).toBe('Remove');
    });

    it('should not display weather content when error', () => {
      const weatherContent = fixture.debugElement.query(By.css('.text-3xl'));
      expect(weatherContent).toBeFalsy();
    });
  });

  describe('Event Emission', () => {
    beforeEach(() => {
      component.weather = mockWeatherData;
      fixture.detectChanges();
    });

    it('should emit removeCity event when remove button is clicked', () => {
      spyOn(component.removeCity, 'emit');

      const removeButton = fixture.debugElement.query(
        By.css('button[title="Remove city"]')
      );
      removeButton.nativeElement.click();

      expect(component.removeCity.emit).toHaveBeenCalledWith('test-id-123');
    });

    it('should emit removeCity event when error state remove button is clicked', () => {
      component.weather = { ...mockWeatherData, error: 'Some error' };
      fixture.detectChanges();

      spyOn(component.removeCity, 'emit');

      const removeButton = fixture.debugElement.query(By.css('.bg-red-500'));
      removeButton.nativeElement.click();

      expect(component.removeCity.emit).toHaveBeenCalledWith('test-id-123');
    });
  });

  describe('getWeatherIconUrl method', () => {
    it('should return correct weather icon URL', () => {
      const iconUrl = component.getWeatherIconUrl('01d');
      expect(iconUrl).toBe('https://openweathermap.org/img/wn/01d@2x.png');
    });

    it('should handle different icon codes', () => {
      const iconUrl = component.getWeatherIconUrl('10n');
      expect(iconUrl).toBe('https://openweathermap.org/img/wn/10n@2x.png');
    });
  });

  describe('Component States', () => {
    it('should show success state when no loading and no error', () => {
      component.weather = mockWeatherData;
      fixture.detectChanges();

      const successState = fixture.debugElement.query(By.css('.relative'));
      const loadingState = fixture.debugElement.query(
        By.css('app-loading-spinner')
      );
      const errorState = fixture.debugElement.query(By.css('.text-red-600'));

      expect(successState).toBeTruthy();
      expect(loadingState).toBeFalsy();
      expect(errorState).toBeFalsy();
    });

    it('should prioritize loading state over error state', () => {
      component.weather = {
        ...mockWeatherData,
        isLoading: true,
        error: 'Some error',
      };
      fixture.detectChanges();

      const loadingState = fixture.debugElement.query(
        By.css('app-loading-spinner')
      );
      const errorState = fixture.debugElement.query(By.css('.text-red-600'));

      expect(loadingState).toBeTruthy();
      expect(errorState).toBeFalsy();
    });
  });
});
