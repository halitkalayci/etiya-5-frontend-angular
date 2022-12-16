import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { OverlayLoadingComponent } from './components/overlay-loading/overlay-loading.component';
import { IfNotDirective } from './directives/if-not.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    OverlayLoadingComponent,
    IfNotDirective,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  exports: [OverlayLoadingComponent, IfNotDirective, LoadingSpinnerComponent],
})
export class CoreModule {}
