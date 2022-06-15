import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { FinancialInformationRoutingModule } from './financial-information.routing';
import { throwIfAlreadyLoaded } from '../../../services/guards/module-import.guard';
import { FinancialInformationComponent } from './financial-information.component';

@NgModule({
  imports: [DxDataGridModule, DxFormModule, FinancialInformationRoutingModule],
  exports: [],
  declarations: [FinancialInformationComponent],
  providers: [],
})
export class FinancialInformationModule {
  constructor(@Optional() @SkipSelf() parentModule: FinancialInformationModule) {
    throwIfAlreadyLoaded(parentModule, 'FinancialInformationModule');
  }
}
