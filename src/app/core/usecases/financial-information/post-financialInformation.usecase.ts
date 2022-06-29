import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { FinancialInformationModel } from '../../models/financial-information.model';
import { FinancialInformationRepository } from '../../repositories/financial-information.repository';

@Injectable({
  providedIn: 'root',
})
export class PostFinancialInformationUsecase
  implements UseCase<FinancialInformationModel, FinancialInformationModel>
{
  constructor(private financialInformationRepository: FinancialInformationRepository) {}

  execute(params: FinancialInformationModel): Observable<FinancialInformationModel> {
    return this.financialInformationRepository.postFinancialInformation(params);
  }
}
