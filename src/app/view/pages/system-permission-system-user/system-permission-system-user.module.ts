import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DxPopupModule, DxDataGridModule, DxFormModule, DxButtonModule, DxTemplateModule, DxCheckBoxModule } from 'devextreme-angular';
import { SystemPermissionRoutingModule } from './system-permission-system-user.routing';
import { throwIfAlreadyLoaded } from '../../../services/guards/module-import.guard';
import { SystemPermissionSystemUserComponent } from './system-permission-system-user.component';
import { ModalModule } from './../../components/modal/modal.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [DxDataGridModule, DxFormModule, SystemPermissionRoutingModule, ModalModule, CommonModule, DxPopupModule,
    DxButtonModule,DxCheckBoxModule,
    DxTemplateModule],
  exports: [],
  declarations: [SystemPermissionSystemUserComponent],
  providers: [],
})
export class SystemPermissionSystemUserModule {
  constructor(@Optional() @SkipSelf() parentModule: SystemPermissionSystemUserModule) {
    throwIfAlreadyLoaded(parentModule, 'SystemPermissionSystemUserModule');
  }
}
