import { Injectable } from "@angular/core";
import { ValueProjectionData } from "./value-projection-data";
import { InvestedProjections } from "./invested-projections";
import { InvestmentDetails } from "./investment-details"

@Injectable({
  providedIn: "root"
})
export class ProjectionsService {
  constructor() {}

  procectionsFrom(details: InvestmentDetails): InvestedProjections {
    let numberOfMonths: number = details.numberOfYears * 12;
    let saved = this.projectionFrom(
      "Reserva",
      details.monthlySavings,
      details.savingsInterest,
      numberOfMonths
    );
    let invested = this.projectionFrom(
      "Investimento",
      details.monthlyInvestment,
      details.investmentInterest,
      numberOfMonths
    );

    let total = this.totalFrom([saved, invested]);

    return new InvestedProjections(saved, invested, total);
  }

  private projectionFrom(
    description: string,
    monthlyDeposit: number,
    interest: number,
    numberOfMonths: number
  ): ValueProjectionData {
    let monthly: Array<number> = [];
    let monthlyEarning: Array<number> = [];

    var accumulator: number = 0;
    for (var i = 0; i < numberOfMonths; i++) {
      accumulator += monthlyDeposit;
      let newValue: number = accumulator * (1 + interest);
      monthly.push(newValue);
      let earning: number = newValue - accumulator;
      monthlyEarning.push(earning);
      accumulator = newValue;
    }

    let total = accumulator;
    let original = monthlyDeposit * numberOfMonths;
    let gainings = total - original;
    let gainingPercentage = (gainings / original) * 100;

    return new ValueProjectionData(
      monthly,
      monthlyEarning,
      total,
      original,
      gainings,
      gainingPercentage,
      description
    );
  }

  private totalFrom(
    projections: Array<ValueProjectionData>
  ): ValueProjectionData {
    let description = "Total";

    let projectionsCount: number = projections.length;
    let numberOfMonths: number = projections[0].monthly.length;

    if (!(projectionsCount > 0)) {
      throw "Missing Data";
    }

    let total = 0;
    let original = 0;
    let gainings = 0;
    let gainingPercentage = 0;
    let monthly = new Array(numberOfMonths).fill(0);
    let monthlyEarning = new Array(numberOfMonths).fill(0);;

    for (var i = 0; i < projectionsCount; i++) {
      total += projections[i].total;
      original += projections[i].original;
      for (var j = 0; j < numberOfMonths; j++) {
        monthly[j] += projections[i].monthly[j];
        monthlyEarning[j] += projections[i].monthlyEarning[j];
      }
    }
    gainings = total - original;
    gainingPercentage = (gainings / original) * 100;

    return new ValueProjectionData(
      monthly,
      monthlyEarning,
      total,
      original,
      gainings,
      gainingPercentage,
      description
    );
  }
}
