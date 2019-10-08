import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { snaAlertService } from './sna-alert.service';
import { snaAlertComponent } from './sna-alert.component';

export * from './sna-alert.service';
export * from './sna-alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    snaAlertComponent

  ],
  exports: [
    snaAlertComponent

  ]
})
class snaAlertModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: snaAlertModule,
      providers: [snaAlertService]
    };
  }
}
