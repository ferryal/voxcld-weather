import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss',
})
export class CitySearchComponent {
  @Output() cityAdded = new EventEmitter<string>();

  cityName: string = '';
  isLoading: boolean = false;

  onSubmit(): void {
    if (this.cityName.trim()) {
      this.isLoading = true;
      this.cityAdded.emit(this.cityName.trim());
      this.cityName = '';
      // Reset loading state after a short delay
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
}
