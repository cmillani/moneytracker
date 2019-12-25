import { InvestmentDetails } from "./investment-details";

export class ValueProjectionData {
  monthly: Array<number>;
  monthlyEarning: Array<number>;
  finalMonthlyEarning: Number;
  total: number;
  original: number;
  gainings: number;
  gainingPercentage: number;
  description: string;
  details?: InvestmentDetails;

  constructor(
    monthly: Array<number>,
    monthlyEarning: Array<number>,
    total: number,
    original: number,
    gainings: number,
    gainingPercentage: number,
    description: string,
    finalMonthlyEarning: number,
    details?: InvestmentDetails
  ) {
    this.details = details;
    this.monthly = monthly;
    this.monthlyEarning = monthlyEarning;
    this.total = total;
    this.original = original;
    this.gainings = gainings;
    this.gainingPercentage = gainingPercentage;
    this.description = description;
    this.finalMonthlyEarning = finalMonthlyEarning;
  }
}
