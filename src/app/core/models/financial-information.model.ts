import { EnumTypeFinancial } from './EnumTypeFinancial';

export interface FinancialInformationModel {
  id?: string;
  type: EnumTypeFinancial;
  dateTime: Date;
  value: number;
  cpf: string;
  card: string;
  shop: string;
  store: string;
}
export interface ListFinancialInformationModel {
  financialInformations: FinancialInformationModel[];
}
