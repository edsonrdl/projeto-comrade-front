import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { SystemUserRepository } from '../../repositories/system-user.repository';
import { SystemUserManagePermissionsModel } from '../../models/system-user-manage-permissions.model';
import { SystemUserManageRolesModel } from '../../models/system-user-manage-roles.model';

@Injectable({
  providedIn: 'root',
})
export class ManageRolesUsecase implements UseCase<SystemUserManageRolesModel, void> {
  constructor(private systemUserRepository: SystemUserRepository) {}

  execute(params: SystemUserManageRolesModel): Observable<void> {
    return this.systemUserRepository.manageRoles(params);
  }
}
