import { Component, computed, inject, input, signal } from '@angular/core';
import { Random as RandomService } from '../random';

@Component({
  selector: 'app-random',
  templateUrl: './random.html',
  styleUrl: './random.css',
})
export class Random {
  readonly max = input(10);
  private readonly randomService = inject(RandomService);
  protected readonly result = signal<number | null>(null);

  protected readonly isLowerHalf = computed(() => {
    const result = this.result();
    return result !== null && result < this.max() * 0.5;
  });

  protected draw(): void {
    this.result.set(this.randomService.randomNumber(this.max()));
  }
}
