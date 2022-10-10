import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemRoleSystemUserComponent } from './system-role-system-user.component';

const routes: Routes = [
  {
    path: '',
    component: SystemRoleSystemUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoleRoutingModule {}
