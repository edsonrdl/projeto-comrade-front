import { NgModule, Optional, SkipSelf } from '@angular/core';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { RoleRoutingModule } from './role.routing';
import { throwIfAlreadyLoaded } from '../../../services/guards/module-import.guard';
import { RoleComponent } from './role.component';
import { ModalModule } from './../../components/modal/modal.module';

@NgModule({
  imports: [DxDataGridModule, DxFormModule, RoleRoutingModule,ModalModule],
  exports: [],
  declarations: [RoleComponent],
  providers: [],
})
export class RoleModule {
  constructor(@Optional() @SkipSelf() parentModule: RoleModule) {
    throwIfAlreadyLoaded(parentModule, 'RoleModule');
  }
}
