import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { FinancialInformationModel } from '../../models/financial-information.model';
import { FinancialInformationRepository } from '../../repositories/financial-information.repository';
import { SingleResultModel } from '../../utils/responses/single-result.model';

@Injectable({
  providedIn: 'root',
})
export class GetFinancialInformationByIdUsecase
  implements UseCase<number, SingleResultModel<FinancialInformationModel>>
{
  constructor(private financialInformationRepository: FinancialInformationRepository) {}

  execute(id: number): Observable<SingleResultModel<FinancialInformationModel>> {
    return this.financialInformationRepository.getFinancialInformationById(id);
  }
}
