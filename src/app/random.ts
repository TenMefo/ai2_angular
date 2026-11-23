import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Random {
  randomNumber(max: number): number {
    if (!Number.isSafeInteger(max) || max < 1) {
      throw new RangeError('Maksimum musi być dodatnią liczbą całkowitą.');
    }

    return Math.floor(Math.random() * max) + 1;
  }
}
