import { Mapper } from '../../../core/utils/bases/mapper';
import { ListFinancialInformationWebEntity } from './financial-information-web-entity';
import { ListFinancialInformationModel } from 'src/app/core/models/financial-information.model';

export class FinancialInformationListWebRepositoryMapper extends Mapper<
  ListFinancialInformationWebEntity,
  ListFinancialInformationModel
> {
  mapFrom(param: ListFinancialInformationWebEntity): ListFinancialInformationModel {
    return {
      financialInformations: param.financialInformations,
    };
  }

  mapTo(param: ListFinancialInformationModel): ListFinancialInformationWebEntity {
    return {
      financialInformations: param.financialInformations,
    };
  }
}
