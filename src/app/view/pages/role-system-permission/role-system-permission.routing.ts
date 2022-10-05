import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleSystemPermissionComponent } from './role-system-permission.component';

const routes: Routes = [
  {
    path: '',
    component: RoleSystemPermissionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleSystemPermissionRoutingModule {}
