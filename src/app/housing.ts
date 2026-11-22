import { Injectable } from '@angular/core';
import { HousingLocationInfo } from './housinglocation';

@Injectable({ providedIn: 'root' })
export class Housing {
  private readonly url = 'http://localhost:54647/locations';

  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error(`Could not load locations (${response.status}).`);

    return (await response.json()) ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
    if (!Number.isSafeInteger(id) || id < 0) return undefined;

    const response = await fetch(`${this.url}/${id}`);
    if (response.status === 404) return undefined;
    if (!response.ok) throw new Error(`Could not load location (${response.status}).`);

    return response.json();
  }
}
