import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HowItWorks } from './sections/how-it-works/how-it-works';
import { Problem } from './sections/problem/problem';
import { Results } from './sections/results/results';

@Component({
  selector: 'app-root',
  imports: [Problem, HowItWorks, Results],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
