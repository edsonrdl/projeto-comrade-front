import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { SystemUserRepository } from '../../repositories/system-user.repository';
import { SystemUserManagePermissionsModel } from '../../models/system-user-manage-permissions.model';

@Injectable({
  providedIn: 'root',
})
export class ManagePermissionsUsecase implements UseCase<SystemUserManagePermissionsModel, void> {
  constructor(private systemUserRepository: SystemUserRepository) {}

  execute(params: SystemUserManagePermissionsModel): Observable<void> {
    return this.systemUserRepository.managePermissions(params);
  }
}
