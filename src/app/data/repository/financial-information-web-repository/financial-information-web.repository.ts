import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialInformationWebRepositoryMapper as FinancialInformationWebRepositoryMapper } from './financial-information-web-repository-mapper';
import {
  FinancialInformationWebEntity,
  ListFinancialInformationWebEntity,
} from './financial-information-web-entity';
import { map } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/services/http/base-http.service';
import { environment } from 'src/environments/environment';
import { FinancialInformationRepository } from 'src/app/core/repositories/financial-information.repository';
import {
  FinancialInformationModel,
  ListFinancialInformationModel,
} from 'src/app/core/models/financial-information.model';
import { PageResultModel } from 'src/app/core/utils/responses/page-result.model';
import { PageFilterModel } from 'src/app/core/utils/filters/page-filter.model';
import { makeParamFilterGrid } from '../../helper.repository';
import { SingleResultModel } from '../../../core/utils/responses/single-result.model';
import { FinancialInformationListWebRepositoryMapper } from './financial-information-list-web-repository-mapper';

@Injectable({
  providedIn: 'root',
})
export class FinancialInformationWebRepository extends FinancialInformationRepository {
  mapper = new FinancialInformationWebRepositoryMapper();
  mapperList = new FinancialInformationListWebRepositoryMapper();

  constructor(public http: BaseHttpService) {
    super();
  }

  getFinancialInformationById(
    id: string
  ): Observable<SingleResultModel<FinancialInformationModel>> {
    PageResultModel;
    return this.http
      .get<SingleResultModel<FinancialInformationWebEntity>>(
        `${environment.FINANCIALINFORMATION}financial-information/get-by-id`,
        id
      )
      .pipe(map((x) => this.mapper.responseWebMapFrom(x.data)));
  }

  getAllFinancialInformation(
    filter: PageFilterModel
  ): Observable<PageResultModel<FinancialInformationModel>> {
    var request = this.http
      .getAll<PageResultModel<FinancialInformationWebEntity>>(
        `${environment.FINANCIALINFORMATION}financial-information/get-all${makeParamFilterGrid(
          filter
        )}`
      )
      .pipe(
        map((x) => {
          return this.mapper.responseGridWebMapFrom(x.data);
        })
      );
    return request;
  }

  postFinancialInformation(param: FinancialInformationModel) {
    return this.http
      .post<FinancialInformationWebEntity>(
        `${environment.FINANCIALINFORMATION}financial-information/create`,
        this.mapper.mapTo(param)
      )
      .pipe(map((x) => this.mapper.mapFrom(x.data)));
  }
  postListFinancialInformation(param: ListFinancialInformationModel) {
    return this.http
      .post<ListFinancialInformationWebEntity>(
        `${environment.FINANCIALINFORMATION}financial-information/create-many`,
        this.mapperList.mapTo(param)
      )
      .pipe(map((x) => this.mapperList.mapFrom(x.data)));
  }

  putFinancialInformation(param: FinancialInformationModel): Observable<void> {
    return this.http
      .put<void>(
        `${environment.FINANCIALINFORMATION}financial-information/edit`,
        this.mapper.mapTo(param)
      )
      .pipe(map((x) => x.data));
  }

  deleteFinancialInformation(id: string): Observable<void> {
    return this.http
      .delete<void>(`${environment.FINANCIALINFORMATION}financial-information/delete/${id}`, id)
      .pipe(map((x) => x.data));
  }
}
