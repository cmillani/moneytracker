import { RecurringExpense } from "./recurring-expense";

export class Profile {
  public wage: number;
  public desiredSavings: number;
  public expenses: Array<RecurringExpense>;
  public keepInvestmentProportion: boolean;
  public toleratedProportionDifference: number;

  constructor(
    wage: number,
    desiredSavings: number,
    expenses: Array<RecurringExpense>,
    keepInvestmentProportion: boolean,
    toleratedProportionDifference: number
  ) {
    this.wage = wage;
    this.desiredSavings = desiredSavings;
    this.expenses = expenses;
    this.keepInvestmentProportion = keepInvestmentProportion;
    this.toleratedProportionDifference = toleratedProportionDifference;
  }
}
