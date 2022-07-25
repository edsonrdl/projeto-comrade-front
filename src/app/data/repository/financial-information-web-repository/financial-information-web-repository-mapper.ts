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
      dateTime: param.dateTime,
      value: param.value,
      cpf: param.cpf,
      card: param.card,
      shop: param.shop,
      store: param.store,
    };
  }

  mapTo(param: FinancialInformationModel): FinancialInformationWebEntity {
    return {
      id: param.id,
      type: param.type,
      dateTime: param.dateTime,
      value: param.value,
      cpf: param.cpf,
      card: param.card,
      shop: param.shop,
      store: param.store,
    };
  }
}
