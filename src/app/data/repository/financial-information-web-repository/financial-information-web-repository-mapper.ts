import { Mapper } from '../../../core/utils/bases/mapper';
import { FinancialInformationWebEntity } from './financial-information-web-entity';
import { FinancialInformationModel } from 'src/app/core/models/financial-information.model';

export class FinancialInformationWebRepositoryMapper extends Mapper<FinancialInformationWebEntity, FinancialInformationModel> {
  mapFrom(param: FinancialInformationWebEntity): FinancialInformationModel {
    return {
      id: param.id,
      name: param.name,
      email: param.email,
      registration: param.registration,
      registerDate: new Date(param.registerDate),
    };
  }

  mapTo(param: FinancialInformationModel): FinancialInformationWebEntity {
    return {
      id: param.id,
      name: param.name,
      email: param.email,
      registration: param.registration,
      registerDate: param.registerDate,
    };
  }
}
