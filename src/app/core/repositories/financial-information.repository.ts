import { Observable } from 'rxjs';
import {
  FinancialInformationModel,
  ListFinancialInformationModel,
} from '../models/financial-information.model';
import { PageFilterModel } from '../utils/filters/page-filter.model';
import { PageResultModel } from '../utils/responses/page-result.model';
import { SingleResultModel } from '../utils/responses/single-result.model';

export abstract class FinancialInformationRepository {
  abstract postListFinancialInformation(
    param: ListFinancialInformationModel[]
  ): Observable<FinancialInformationModel[]>;
  abstract getFinancialInformationById(
    id: string
  ): Observable<SingleResultModel<FinancialInformationModel>>;
  abstract getAllFinancialInformation(
    filter: PageFilterModel
  ): Observable<PageResultModel<FinancialInformationModel>>;
  abstract postFinancialInformation(
    param: FinancialInformationModel
  ): Observable<FinancialInformationModel>;
  abstract putFinancialInformation(param: FinancialInformationModel): Observable<void>;
  abstract deleteFinancialInformation(id: string): Observable<void>;
}
