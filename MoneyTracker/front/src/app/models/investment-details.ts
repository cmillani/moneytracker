import { v4 as uuid } from "uuid";

export class InvestmentDetails {
  id: string;
  description: string = "Investimento";
  numberOfYears: number = 10;
  initialValue: string = "0;";
  monthlyValue: string = "1000,00";
  interest: string = "0.5";
  startingYear: number = 0;

  constructor(id: string = uuid()) {
    this.id = id;
  }
}
