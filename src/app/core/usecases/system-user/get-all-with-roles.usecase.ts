import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { PageFilterModel } from '../../utils/filters/page-filter.model';
import { PageResultModel } from '../../utils/responses/page-result.model';
import { SystemUserRepository } from '../../repositories/system-user.repository';
import { SystemUserSystemRolesModel } from '../../models/system-user-system-roles.model';


@Injectable({
  providedIn: 'root',
})
export class GetallwithRolesUsecase
  implements UseCase<PageFilterModel, PageResultModel<SystemUserSystemRolesModel>>
{
  constructor(private systemUserRepository: SystemUserRepository) {}

  execute(filter: PageFilterModel): Observable<PageResultModel<SystemUserSystemRolesModel>> {
    return this.systemUserRepository.getAllWithRoles(filter);
  }
}
