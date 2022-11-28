import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="spinner-grow text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {}
