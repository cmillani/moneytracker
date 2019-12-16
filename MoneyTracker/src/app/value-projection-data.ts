export class ValueProjectionData {
  monthly: Array<number>;
  monthlyEarning: Array<number>;
  finalMonthlyEarning: Number;
  total: number;
  original: number;
  gainings: number;
  gainingPercentage: number;
  description: string;

  constructor(
    monthly: Array<number>,
    monthlyEarning: Array<number>,
    total: number,
    original: number,
    gainings: number,
    gainingPercentage: number,
    description: string
  ) {
    this.monthly = monthly;
    this.monthlyEarning = monthlyEarning;
    this.total = total.roundTo2Places();
    this.original = original.roundTo2Places();
    this.gainings = gainings.roundTo2Places();
    this.gainingPercentage = gainingPercentage.roundTo2Places();
    this.description = description;
    this.finalMonthlyEarning = monthlyEarning[monthlyEarning.length - 1].roundTo2Places();
  }
}
