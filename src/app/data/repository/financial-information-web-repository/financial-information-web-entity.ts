import { EnumTypeFinancial } from 'src/app/core/models/EnumTypeFinancial';

export interface FinancialInformationWebEntity {
  id?: string;
  type: EnumTypeFinancial;
  dateTime: Date;
  value: number;
  cpf: string;
  card: string;
  shop: string;
  store: string;
}
export interface ListFinancialInformationWebEntity {
  financialInformations: FinancialInformationWebEntity[];
}
