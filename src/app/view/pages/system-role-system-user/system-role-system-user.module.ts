import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DxPopupModule, DxDataGridModule, DxFormModule, DxButtonModule, DxTemplateModule, DxCheckBoxModule } from 'devextreme-angular';
import { SystemRoleRoutingModule } from './system-role-system-user.routing';
import { throwIfAlreadyLoaded } from '../../../services/guards/module-import.guard';
import { SystemRoleSystemUserComponent } from './system-role-system-user.component';
import { ModalModule } from './../../components/modal/modal.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [DxDataGridModule, DxFormModule, SystemRoleRoutingModule, ModalModule, CommonModule, DxPopupModule,
    DxButtonModule,DxCheckBoxModule,
    DxTemplateModule],
  exports: [],
  declarations: [SystemRoleSystemUserComponent],
  providers: [],
})
export class SystemRoleSystemUserModule {
  constructor(@Optional() @SkipSelf() parentModule: SystemRoleSystemUserModule) {
    throwIfAlreadyLoaded(parentModule, 'SystemRoleSystemUserModule');
  }
}
