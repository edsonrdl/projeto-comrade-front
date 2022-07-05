import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { ListFinancialInformationModel } from '../../models/financial-information.model';
import { FinancialInformationRepository } from '../../repositories/financial-information.repository';

@Injectable({
  providedIn: 'root',
})
export class PostListFinancialInformationUsecase
  implements UseCase<ListFinancialInformationModel, ListFinancialInformationModel>
{
  constructor(private financialInformationRepository: FinancialInformationRepository) {}

  execute(params: ListFinancialInformationModel): Observable<ListFinancialInformationModel> {
    return this.financialInformationRepository.postListFinancialInformation(params);
  }
}
