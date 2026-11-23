import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Item {
  id: number;
  text: string;
}

@Component({
  selector: 'app-list',
  imports: [FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  protected text = '';
  protected readonly items = signal<Item[]>([]);
  private nextId = 0;

  protected add(): void {
    const text = this.text.trim();
    if (!text) return;

    const item = { id: this.nextId++, text };
    this.items.update((items) => [...items, item]);
    this.text = '';
  }

  protected remove(id: number): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }
}
