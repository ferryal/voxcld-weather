import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('localStorage', [
      'getItem',
      'setItem',
      'removeItem',
    ]);

    TestBed.configureTestingModule({
      providers: [LocalStorageService, { provide: Storage, useValue: spy }],
    });

    service = TestBed.inject(LocalStorageService);
    localStorageSpy = jasmine.createSpyObj('localStorage', [
      'getItem',
      'setItem',
      'removeItem',
    ]);

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpy,
      writable: true,
    });
  });

  afterEach(() => {
    localStorageSpy.getItem.calls.reset();
    localStorageSpy.setItem.calls.reset();
    localStorageSpy.removeItem.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveCities', () => {
    it('should save cities to localStorage', () => {
      const cities = ['London', 'Paris', 'Tokyo'];

      service.saveCities(cities);

      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        'weather-dashboard-cities',
        JSON.stringify(cities)
      );
    });

    it('should handle localStorage errors gracefully', () => {
      const cities = ['London', 'Paris'];
      localStorageSpy.setItem.and.throwError('Storage quota exceeded');
      spyOn(console, 'error');

      service.saveCities(cities);

      expect(console.error).toHaveBeenCalledWith(
        'Error saving cities to localStorage:',
        jasmine.any(Error)
      );
    });
  });

  describe('getCities', () => {
    it('should retrieve cities from localStorage', () => {
      const cities = ['London', 'Paris', 'Tokyo'];
      localStorageSpy.getItem.and.returnValue(JSON.stringify(cities));

      const result = service.getCities();

      expect(localStorageSpy.getItem).toHaveBeenCalledWith(
        'weather-dashboard-cities'
      );
      expect(result).toEqual(cities);
    });

    it('should return empty array when no cities are stored', () => {
      localStorageSpy.getItem.and.returnValue(null);

      const result = service.getCities();

      expect(result).toEqual([]);
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageSpy.getItem.and.throwError('Storage not available');
      spyOn(console, 'error');

      const result = service.getCities();

      expect(console.error).toHaveBeenCalledWith(
        'Error retrieving cities from localStorage:',
        jasmine.any(Error)
      );
      expect(result).toEqual([]);
    });

    it('should handle invalid JSON gracefully', () => {
      localStorageSpy.getItem.and.returnValue('invalid json');
      spyOn(console, 'error');

      const result = service.getCities();

      expect(console.error).toHaveBeenCalledWith(
        'Error retrieving cities from localStorage:',
        jasmine.any(Error)
      );
      expect(result).toEqual([]);
    });
  });

  describe('addCity', () => {
    it('should add a new city to the list', () => {
      const existingCities = ['London', 'Paris'];
      localStorageSpy.getItem.and.returnValue(JSON.stringify(existingCities));

      service.addCity('Tokyo');

      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        'weather-dashboard-cities',
        JSON.stringify(['London', 'Paris', 'Tokyo'])
      );
    });

    it('should not add duplicate cities', () => {
      const existingCities = ['London', 'Paris'];
      localStorageSpy.getItem.and.returnValue(JSON.stringify(existingCities));

      service.addCity('London');

      // Should not call setItem since the city already exists
      expect(localStorageSpy.setItem).not.toHaveBeenCalled();
    });

    it('should add city to empty list', () => {
      localStorageSpy.getItem.and.returnValue(null);

      service.addCity('London');

      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        'weather-dashboard-cities',
        JSON.stringify(['London'])
      );
    });
  });

  describe('removeCity', () => {
    it('should remove a city from the list', () => {
      const existingCities = ['London', 'Paris', 'Tokyo'];
      localStorageSpy.getItem.and.returnValue(JSON.stringify(existingCities));

      service.removeCity('Paris');

      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        'weather-dashboard-cities',
        JSON.stringify(['London', 'Tokyo'])
      );
    });

    it('should handle removing non-existent city', () => {
      const existingCities = ['London', 'Paris'];
      localStorageSpy.getItem.and.returnValue(JSON.stringify(existingCities));

      service.removeCity('Tokyo');

      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        'weather-dashboard-cities',
        JSON.stringify(['London', 'Paris'])
      );
    });
  });

  describe('clearAllCities', () => {
    it('should remove all cities from localStorage', () => {
      service.clearAllCities();

      expect(localStorageSpy.removeItem).toHaveBeenCalledWith(
        'weather-dashboard-cities'
      );
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageSpy.removeItem.and.throwError('Storage not available');
      spyOn(console, 'error');

      service.clearAllCities();

      expect(console.error).toHaveBeenCalledWith(
        'Error clearing cities from localStorage:',
        jasmine.any(Error)
      );
    });
  });
});
