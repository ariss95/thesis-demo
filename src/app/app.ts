import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Results } from './sections/results/results';

@Component({
  selector: 'app-root',
  imports: [Results],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
