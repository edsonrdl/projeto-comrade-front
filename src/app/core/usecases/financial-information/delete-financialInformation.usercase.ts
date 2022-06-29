import { Injectable } from '@angular/core';
import { UseCase } from '../../utils/bases/use-case';
import { Observable } from 'rxjs';
import { FinancialInformationRepository } from '../../repositories/financial-information.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteFinancialInformationUsercase implements UseCase<string, void> {
  constructor(private financialInformationRepository: FinancialInformationRepository) {}

  execute(id: string): Observable<void> {
    return this.financialInformationRepository.deleteFinancialInformation(id);
  }
}
