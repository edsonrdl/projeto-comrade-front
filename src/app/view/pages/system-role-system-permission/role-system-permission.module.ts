import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DxPopupModule, DxDataGridModule, DxFormModule, DxButtonModule, DxTemplateModule, DxCheckBoxModule } from 'devextreme-angular';
import { RoleSystemPermissionRoutingModule } from './role-system-permission.routing';
import { throwIfAlreadyLoaded } from '../../../services/guards/module-import.guard';
import { RoleSystemPermissionComponent } from './role-system-permission.component';
import { ModalModule } from './../../components/modal/modal.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [DxDataGridModule, DxFormModule, RoleSystemPermissionRoutingModule, ModalModule, CommonModule, DxPopupModule,
    DxButtonModule,DxCheckBoxModule,
    DxTemplateModule],
  exports: [],
  declarations: [RoleSystemPermissionComponent],
  providers: [],
})
export class RoleSystemPermissionModule {
  constructor(@Optional() @SkipSelf() parentModule: RoleSystemPermissionModule) {
    throwIfAlreadyLoaded(parentModule, 'RoleSystemPermissionModule');
  }
}
