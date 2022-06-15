import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { FinancialInformationModel } from '../../models/financial-information.model';
import { FinancialInformationRepository } from '../../repositories/financial-information.repository';

@Injectable({
  providedIn: 'root',
})
export class PutFinancialInformationUsecase implements UseCase<FinancialInformationModel, void> {
  constructor(private financialInformationRepository: FinancialInformationRepository) {}

  execute(params: FinancialInformationModel): Observable<void> {
    return this.financialInformationRepository.putFinancialInformation(params);
  }
}
