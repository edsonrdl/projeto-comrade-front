import { Mapper } from '../../../core/utils/bases/mapper';
import { FinancialInformationWebEntity } from './financial-information-web-entity';
import { FinancialInformationModel } from 'src/app/core/models/financial-information.model';

export class FinancialInformationWebRepositoryMapper extends Mapper<
  FinancialInformationWebEntity,
  FinancialInformationModel
> {
  mapFrom(param: FinancialInformationWebEntity): FinancialInformationModel {
    return {
      id: param.id,
      type: param.type,
      date: param.date,
      value: param.value,
      cPF: param.cPF,
      card: param.card,
      hour: param.hour,
      shop: param.shop,
      store: param.store,
    };
  }

  mapTo(param: FinancialInformationModel): FinancialInformationWebEntity {
    return {
      id: param.id,
      type: param.type,
      date: param.date,
      value: param.value,
      cPF: param.cPF,
      card: param.card,
      hour: param.hour,
      shop: param.shop,
      store: param.store,
    };
  }
}
