export interface FinancialInformationModel {
  id?: string;
  type: string;
  date: string;
  value: string;
  cpf: string;
  card: string;
  hour: string;
  shop: string;
  store: string;
}
export interface ListFinancialInformationModel {
  financialInformations: FinancialInformationModel[];
}
