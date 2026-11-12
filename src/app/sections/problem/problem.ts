import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.html',
  styleUrl: './problem.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Problem {}
