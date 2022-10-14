import { Mapper } from '../../../core/utils/bases/mapper';
import { SystemUserManageRolesWebEntity } from './system-user-manage-roles-web-entity';
import { SystemUserManageRolesModel } from 'src/app/core/models/system-user-manage-roles.model';

export class SystemUserManageRolesWebRepositoryMapper extends Mapper<SystemUserManageRolesWebEntity, SystemUserManageRolesModel> {
  mapFrom(param: SystemUserManageRolesWebEntity): SystemUserManageRolesModel {
    return {
      id: param.id,
      systemRoles: param.systemRoles      
    };
  }

  mapTo(param: SystemUserManageRolesModel): SystemUserManageRolesWebEntity {
    return {
      id: param.id,
      systemRoles: param.systemRoles 
    };
  }
}
