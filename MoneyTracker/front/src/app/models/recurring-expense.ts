export class RecurringExpense {
  public value: number;
  public name: string;

  constructor(value: number = 0, name: string = "") {
    this.name = name;
    this.value = value;
  }
}
