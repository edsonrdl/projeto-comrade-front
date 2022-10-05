import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemPermissionSystemUserComponent } from './system-permission-system-user.component';

const routes: Routes = [
  {
    path: '',
    component: SystemPermissionSystemUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemPermissionRoutingModule {}
