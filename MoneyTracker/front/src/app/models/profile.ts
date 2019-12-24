import { RecurringExpense } from "./recurring-expense";

export class Profile {
  public wage: number;
  public desiredSavings: number;
  public expenses: Array<RecurringExpense>;

  constructor(
    wage: number,
    desiredSavings: number,
    expenses: Array<RecurringExpense>
  ) {
    this.wage = wage;
    this.desiredSavings = desiredSavings;
    this.expenses = expenses;
  }
}
