import { Component } from '@angular/core';
import { List } from './list/list';
import { Random } from './random/random';

@Component({
  selector: 'app-root',
  imports: [Random, List],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'LAB J Mateusz Parciak';
}
