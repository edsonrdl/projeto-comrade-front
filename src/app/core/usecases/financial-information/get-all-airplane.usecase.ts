import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { PageFilterModel } from '../../utils/filters/page-filter.model';
import { PageResultModel } from '../../utils/responses/page-result.model';
import { FinancialInformationModel } from '../../models/financial-information.model';
import { FinancialInformationRepository } from '../../repositories/financial-information.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAllFinancialInformationUsecase
  implements UseCase<PageFilterModel, PageResultModel<FinancialInformationModel>>
{
  constructor(private financialInformationRepository: FinancialInformationRepository) {}

  execute(filter: PageFilterModel): Observable<PageResultModel<FinancialInformationModel>> {
    return this.financialInformationRepository.getAllFinancialInformation(filter);
  }
}
