import { ValueProjectionData } from './value-projection-data';

export class InvestedProjections {
  saved: ValueProjectionData;
  invested: ValueProjectionData;
  total: ValueProjectionData;

  constructor(
    saved: ValueProjectionData,
    invested: ValueProjectionData,
    total: ValueProjectionData
  ) {
    this.saved = saved;
    this.invested = invested;
    this.total = total;
  }
}
