import { Component, computed, inject, signal } from '@angular/core';
import { Housing } from '../housing';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly housingService = inject(Housing);
  private readonly housingLocationList = signal<HousingLocationInfo[]>([]);
  private readonly cityFilter = signal('');
  protected readonly loading = signal(true);
  protected readonly loadFailed = signal(false);
  protected readonly filteredLocationList = computed(() => {
    const query = this.cityFilter();
    return this.housingLocationList().filter(({ city }) => city.toLowerCase().includes(query));
  });

  constructor() {
    this.housingService.getAllHousingLocations()
      .then((locations) => this.housingLocationList.set(locations))
      .catch(() => this.loadFailed.set(true))
      .finally(() => this.loading.set(false));
  }

  protected filterResults(text: string, event: Event): void {
    event.preventDefault();
    this.cityFilter.set(text.trim().toLowerCase());
  }
}
