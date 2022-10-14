import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { PageFilterModel } from '../../utils/filters/page-filter.model';
import { PageResultModel } from '../../utils/responses/page-result.model';
import { SystemUserSystemPermissionsModel } from '../../models/system-user-system-permissions.model';
import { SystemUserRepository } from '../../repositories/system-user.repository';


@Injectable({
  providedIn: 'root',
})
export class GetAllWithPermissionsUsecase
  implements UseCase<PageFilterModel, PageResultModel<SystemUserSystemPermissionsModel>>
{
  constructor(private systemUserRepository: SystemUserRepository) {}

  execute(filter: PageFilterModel): Observable<PageResultModel<SystemUserSystemPermissionsModel>> {
    return this.systemUserRepository.getAllWithPermissions(filter);
  }
}
