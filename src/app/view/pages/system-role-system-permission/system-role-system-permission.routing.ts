import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemRoleSystemPermissionComponent } from './system-role-system-permission.component';

const routes: Routes = [
  {
    path: '',
    component: SystemRoleSystemPermissionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoleSystemPermissionRoutingModule {}
