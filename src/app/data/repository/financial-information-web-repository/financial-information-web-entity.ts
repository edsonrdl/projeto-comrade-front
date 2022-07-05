export interface FinancialInformationWebEntity {
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
export interface ListFinancialInformationWebEntity {
  financialInformations: FinancialInformationWebEntity[];
}
