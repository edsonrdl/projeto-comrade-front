import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../utils/bases/use-case';
import { FinancialInformationLookupRepository } from './FinancialInformationLookupRepository';
import { LookupModel } from '../../models/lookup.model';

@Injectable({
  providedIn: 'root',
})
export class FinancialInformationLookupByNameUsecase implements UseCase<string, LookupModel[]> {
  constructor(private lookupRepository: FinancialInformationLookupRepository) {}

  execute(nome: string): Observable<LookupModel[]> {
    return this.lookupRepository.GetAllByName(nome);
  }
}
