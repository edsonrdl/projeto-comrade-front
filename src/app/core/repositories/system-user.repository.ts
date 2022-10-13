import { Observable } from 'rxjs';
import { SystemUserManagePermissionsModel } from '../models/system-user-manage-permissions.model';
import { SystemUserManageRolesModel } from '../models/system-user-manage-roles.model';
import { SystemUserSystemPermissionsModel } from '../models/system-user-system-permissions.model';
import { SystemUserSystemRolesModel } from '../models/system-user-system-roles.model';
import { SystemUserModel } from '../models/system-user.model';
import { PageFilterModel } from '../utils/filters/page-filter.model';
import { PageResultModel } from '../utils/responses/page-result.model';
import { SingleResultModel } from '../utils/responses/single-result.model';

export abstract class SystemUserRepository {
  abstract getSystemUserById(id: string): Observable<SingleResultModel<SystemUserModel>>;
  abstract getAllSystemUser(filter: PageFilterModel): Observable<PageResultModel<SystemUserModel>>;
  abstract createSystemUser(param: SystemUserModel): Observable<SystemUserModel>;
  abstract editSystemUser(param: SystemUserModel): Observable<void>;
  abstract deleteSystemUser(id: string): Observable<void>;
  abstract getAllWithPermissions(filter: PageFilterModel): Observable<PageResultModel<SystemUserSystemPermissionsModel>>;
  abstract managePermissions(param: SystemUserManagePermissionsModel): Observable<void>;
  abstract getAllWithRoles(filter: PageFilterModel): Observable<PageResultModel<SystemUserSystemRolesModel>>;
  abstract manageRoles(param:SystemUserManageRolesModel): Observable<void>;
}
