import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../utils/bases/use-case';
import { FinancialInformationLookupRepository } from './financial-information-lookup.repository';
import { LookupModel } from '../../models/lookup.model';

@Injectable({
  providedIn: 'root',
})
export class FinancialInformationLookupUsecase implements UseCase<void, LookupModel[]> {
  constructor(private lookupRepository: FinancialInformationLookupRepository) {}

  execute(): Observable<LookupModel[]> {
    return this.lookupRepository.GetAll();
  }
}
