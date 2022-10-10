import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DxPopupModule, DxDataGridModule, DxFormModule, DxButtonModule, DxTemplateModule, DxCheckBoxModule } from 'devextreme-angular';
import { SystemRoleSystemPermissionRoutingModule } from './system-role-system-permission.routing';
import { throwIfAlreadyLoaded } from '../../../services/guards/module-import.guard';
import { SystemRoleSystemPermissionComponent } from './system-role-system-permission.component';
import { ModalModule } from './../../components/modal/modal.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [DxDataGridModule, DxFormModule, SystemRoleSystemPermissionRoutingModule, ModalModule, CommonModule, DxPopupModule,
    DxButtonModule,DxCheckBoxModule,
    DxTemplateModule],
  exports: [],
  declarations: [SystemRoleSystemPermissionComponent],
  providers: [],
})
export class SystemRoleSystemPermissionModule {
  constructor(@Optional() @SkipSelf() parentModule: SystemRoleSystemPermissionModule) {
    throwIfAlreadyLoaded(parentModule, 'SystemRoleSystemPermissionModule');
  }
}
