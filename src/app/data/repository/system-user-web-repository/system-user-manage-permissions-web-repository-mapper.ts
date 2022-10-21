import { Mapper } from '../../../core/utils/bases/mapper';
import { SystemUserManagePermissionsWebEntity } from './system-user-manage-permissions-web-entity';
import { SystemUserManagePermissionsModel } from 'src/app/core/models/system-user-manage-permissions.model';

export class SystemUserManagePermissionsWebRepositoryMapper extends Mapper<SystemUserManagePermissionsWebEntity, SystemUserManagePermissionsModel> {
  mapFrom(param: SystemUserManagePermissionsWebEntity): SystemUserManagePermissionsModel {
    return {
      id: param.id,
      systemPermissionIds: param.systemPermissionIds      
    };
  }

  mapTo(param: SystemUserManagePermissionsModel): SystemUserManagePermissionsWebEntity {
    return {
      id: param.id,
      systemPermissionIds: param.systemPermissionIds 
    };
  }
}
