import { ValueProjectionData } from './value-projection-data';

export class InvestedProjections {
  investments: Array<ValueProjectionData>;
  total: ValueProjectionData;

  constructor(
    investments: Array<ValueProjectionData>,
    total: ValueProjectionData
  ) {
    this.investments = [...investments, total];
    this.total = total;
  }
}
