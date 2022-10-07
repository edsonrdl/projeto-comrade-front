import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { SystemRoleRoutingModule } from './system-role.routing';
import { throwIfAlreadyLoaded } from '../../../services/guards/module-import.guard';
import {SystemRoleComponent } from './system-role.component';
import { ModalModule } from './../../components/modal/modal.module';

@NgModule({
  imports: [DxDataGridModule, DxFormModule, SystemRoleRoutingModule,ModalModule],
  exports: [],
  declarations: [SystemRoleComponent],
  providers: [],
})
export class SystemRoleModule {
  constructor(@Optional() @SkipSelf() parentModule: SystemRoleModule) {
    throwIfAlreadyLoaded(parentModule, 'SystemRoleModule');
  }
}
