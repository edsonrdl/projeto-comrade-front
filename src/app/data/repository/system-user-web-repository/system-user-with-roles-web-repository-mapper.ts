import { Mapper } from '../../../core/utils/bases/mapper';
import { SystemUserSystemRolesModel } from 'src/app/core/models/system-user-system-roles.model';
import { SystemUserWithRolessWebEntity } from './system-user-with-roles-web-entity';

export class SystemUserWithRolesWebRepositoryMapper
  extends Mapper<SystemUserWithRolessWebEntity, SystemUserSystemRolesModel> {
  mapFrom(param: SystemUserWithRolessWebEntity): SystemUserSystemRolesModel {
    return {
      ...param
    };
  }

  mapTo(param: SystemUserSystemRolesModel): SystemUserWithRolessWebEntity {
    return {
      ...param
    };
  }
}
