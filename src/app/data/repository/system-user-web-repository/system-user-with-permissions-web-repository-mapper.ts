import { Mapper } from '../../../core/utils/bases/mapper';
import { SystemUserSystemPermissionsModel } from 'src/app/core/models/system-user-system-permissions.model';
import { SystemUserWithPermissionsWebEntity } from './system-user-with-permissions-web-entity';

export class SystemUserWithPermissionsWebRepositoryMapper
  extends Mapper<SystemUserWithPermissionsWebEntity, SystemUserSystemPermissionsModel> {
  mapFrom(param: SystemUserWithPermissionsWebEntity): SystemUserSystemPermissionsModel {
    return {
      ...param
    };
  }

  mapTo(param: SystemUserSystemPermissionsModel): SystemUserWithPermissionsWebEntity {
    return {
      ...param
    };
  }
}
