import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemUserWebRepositoryMapper as SystemUserWebRepositoryMapper } from './system-user-web-repository-mapper';
import { SystemUserWebEntity } from './system-user-web-entity';
import { map } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/services/http/base-http.service';
import { environment } from 'src/environments/environment';
import { SystemUserRepository } from 'src/app/core/repositories/system-user.repository';
import { SystemUserModel } from 'src/app/core/models/system-user.model';
import { PageResultModel } from 'src/app/core/utils/responses/page-result.model';
import { PageFilterModel } from 'src/app/core/utils/filters/page-filter.model';
import { makeParamFilterGrid } from '../../helper.repository';
import { SingleResultModel } from '../../../core/utils/responses/single-result.model';
import { SystemUserSystemPermissionsModel } from 'src/app/core/models/system-user-system-permissions.model';
import { SystemUserSystemRolesModel } from 'src/app/core/models/system-user-system-roles.model';
import { SystemUserManagePermissionsModel } from 'src/app/core/models/system-user-manage-permissions.model';
import { SystemUserManageRolesModel } from 'src/app/core/models/system-user-manage-roles.model';
import { SystemUserManageRolesWebRepositoryMapper } from './system-user-manage-roles-web-repository-mapper';
import { SystemUserManagePermissionsWebRepositoryMapper } from './system-user-manage-permissions-web-repository-mapper';
import { SystemUserWithPermissionsWebRepositoryMapper } from './system-user-with-permissions-web-repository-mapper';
import { SystemUserWithPermissionsWebEntity } from './system-user-with-permissions-web-entity';
import { SystemUserWithRolesWebRepositoryMapper } from './system-user-with-roles-web-repository-mapper';
import { SystemUserWithRolessWebEntity } from './system-user-with-roles-web-entity';

@Injectable({
  providedIn: 'root',
})
export class SystemUserWebRepository extends SystemUserRepository {
  mapper = new SystemUserWebRepositoryMapper();
  manageRolesMapper = new SystemUserManageRolesWebRepositoryMapper();
  managePermissionsMapper = new SystemUserManagePermissionsWebRepositoryMapper();
  withPermissionsMapper = new SystemUserWithPermissionsWebRepositoryMapper();
  withRolesMapper = new SystemUserWithRolesWebRepositoryMapper();

  constructor(public http: BaseHttpService) {
    super();
  }

  getSystemUserById(id: string): Observable<SingleResultModel<SystemUserModel>> {
    PageResultModel;
    return this.http
      .get<SingleResultModel<SystemUserWebEntity>>(
        `${environment.SYSTEMUSER}system-user/get-by-id`,
        id
      )
      .pipe(map((x) => this.mapper.responseWebMapFrom(x.data)));
  }

  getAllSystemUser(filter: PageFilterModel): Observable<PageResultModel<SystemUserModel>> {
    var request = this.http
      .getAll<PageResultModel<SystemUserWebEntity>>(
        `${environment.SYSTEMUSER}system-user/get-all${makeParamFilterGrid(filter)}`
      )
      .pipe(
        map((x) => {
          return this.mapper.responseGridWebMapFrom(x.data);
        })
      );
    return request;
  }

  createSystemUser(param: SystemUserModel) {
    return this.http
      .post<SystemUserWebEntity>(
        `${environment.SYSTEMUSER}system-user/create`,
        this.mapper.mapTo(param)
      )
      .pipe(map((x) => this.mapper.mapFrom(x.data)));
  }

  editSystemUser(param: SystemUserModel) {
    return this.http
      .put<void>(`${environment.SYSTEMUSER}system-user/edit`, this.mapper.mapTo(param))
      .pipe(map((x) => x.data));
  }

  deleteSystemUser(id: string): Observable<void> {
    return this.http
      .delete<void>(`${environment.SYSTEMUSER}system-user/delete/${id}`, id)
      .pipe(map((x) => x.data));
  }
  getAllWithPermissions(filter: PageFilterModel): Observable<PageResultModel<SystemUserSystemPermissionsModel>> {
    var request = this.http
      .getAll<PageResultModel<SystemUserWithPermissionsWebEntity>>(
        `${environment.SYSTEMUSER}system-user/get-all-with-permissions${makeParamFilterGrid(filter)}`
      )
      .pipe(
        map((x) => {
          return this.withPermissionsMapper.responseGridWebMapFrom(x.data);
        })
      );
    return request;
  }
  getAllWithRoles(filter: PageFilterModel): Observable<PageResultModel<SystemUserSystemRolesModel>> {
    var request = this.http
      .getAll<PageResultModel<SystemUserWithRolessWebEntity>>(
        `${environment.SYSTEMUSER}system-user/get-all-with-roles${makeParamFilterGrid(filter)}`
      )
      .pipe(
        map((x) => {
          return this.withRolesMapper.responseGridWebMapFrom(x.data);
        })
      );
    return request;
  }
  managePermissions(param: SystemUserManagePermissionsModel) {
    return this.http
      .put<void>(`${environment.SYSTEMUSER}system-user/manage-permissions`, this.managePermissionsMapper.mapTo(param))
      .pipe(map((x) => x.data));
  }
  manageRoles(param: SystemUserManageRolesModel) {
    return this.http
      .put<void>(`${environment.SYSTEMUSER}system-user/edit`, this.manageRolesMapper.mapTo(param))
      .pipe(map((x) => x.data));
  }
}
