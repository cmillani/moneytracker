export class InvestedProjections {
  monthlyTotal: Array<number> = [];
  monthlyInvested: Array<number> = [];
  monthlySaved: Array<number> = [];

  monthlyEarnings: Array<number> = [];
  monthlyInvestedEarnings: Array<number> = [];
  monthlySavedEarnings: Array<number> = [];

  constructor(
    monthlyTotal: Array<number>,
    monthlyInvested: Array<number>,
    monthlySaved: Array<number>,
    monthlyEarnings: Array<number>,
    monthlyInvestedEarnings: Array<number>,
    monthlySavedEarnings: Array<number>
  ) {
    this.monthlyTotal = monthlyTotal;
    this.monthlyInvested = monthlyInvested;
    this.monthlySaved = monthlySaved;
    this.monthlyEarnings = monthlyEarnings;
    this.monthlyInvestedEarnings = monthlyInvestedEarnings;
    this.monthlySavedEarnings = monthlySavedEarnings;
  }
}
