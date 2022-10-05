import { Mapper } from '../../../core/utils/bases/mapper';
import { SystemRoleWebEntity } from './system-role-web-entity';
import { RoleModel } from 'src/app/core/models/role.model';

export class RoleWebRepositoryMapper extends Mapper<SystemRoleWebEntity, RoleModel> {
  mapFrom(param: SystemRoleWebEntity): RoleModel {
    return {
      id: param.id,
      name: param.name,
    };
  }

  mapTo(param: RoleModel): SystemRoleWebEntity {
    return {
      id: param.id,
      name: param.name,

    };
  }
}
