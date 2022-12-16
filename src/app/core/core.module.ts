import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { OverlayLoadingComponent } from './components/overlay-loading/overlay-loading.component';
import { IfNotDirective } from './directives/if-not.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    OverlayLoadingComponent,
    IfNotDirective,
    LoadingSpinnerComponent,
  ],
  imports: [CommonModule, CoreRoutingModule],
  exports: [OverlayLoadingComponent, IfNotDirective, LoadingSpinnerComponent],
})
export class CoreModule {}
