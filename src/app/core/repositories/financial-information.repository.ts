import { Observable } from 'rxjs';
import { FinancialInformationModel } from '../models/financial-information.model';
import { PageFilterModel } from '../utils/filters/page-filter.model';
import { PageResultModel } from '../utils/responses/page-result.model';
import { SingleResultModel } from '../utils/responses/single-result.model';

export abstract class FinancialInformationRepository {
  abstract getFinancialInformationById(id: number): Observable<SingleResultModel<FinancialInformationModel>>;
  abstract getAllFinancialInformation(filter: PageFilterModel): Observable<PageResultModel<FinancialInformationModel>>;
  abstract postFinancialInformation(param: FinancialInformationModel): Observable<FinancialInformationModel>;
  abstract putFinancialInformation(param: FinancialInformationModel): Observable<void>;
  abstract deleteFinancialInformation(id: number): Observable<void>;
}
