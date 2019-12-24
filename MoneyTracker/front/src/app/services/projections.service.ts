import { Injectable } from "@angular/core";
import { ValueProjectionData } from "../models/value-projection-data";
import { InvestedProjections } from "../models/invested-projections";
import { InvestmentDetails } from "../models/investment-details"

@Injectable({
  providedIn: "root"
})
export class ProjectionsService {
  constructor() { }

  projectionsFrom(details: Array<InvestmentDetails>): InvestedProjections {
    let maximumTime: number = details.reduce((max, current) => { return Math.max(max, current.numberOfYears) }, 0);
    let projections: Array<ValueProjectionData> = []
    for (let detail of details) {
      projections.push(this.projectionFrom(detail, maximumTime))
    }

    let total: ValueProjectionData
    if (projections.length > 0) {
      total = this.totalFrom(projections, maximumTime);
    } else {
      total = new ValueProjectionData([], [], 0, 0, 0, 0, "Total")
    }

    return new InvestedProjections(projections, total);
  }

  private projectionFrom(
    details: InvestmentDetails,
    maximumTime: number
  ): ValueProjectionData {
    let monthly: Array<number> = [];
    let monthlyEarning: Array<number> = [];

    let finalNumberOfMonths: number = maximumTime * 12;
    let numberOfMonths: number = details.numberOfYears * 12;
    let interest: number = parseFloat(details.interest) / 100;

    var accumulator: number = parseFloat(details.initialValue);
    for (var i = 0; i < numberOfMonths; i++) {
      accumulator += parseFloat(details.monthlyValue);
      let newValue: number = accumulator * (1 + interest);
      monthly.push(newValue);
      let earning: number = newValue - accumulator;
      monthlyEarning.push(earning);
      accumulator = newValue;
    }

    for (var i = numberOfMonths; i < finalNumberOfMonths; i++) {
      let newValue: number = accumulator * (1 + interest);
      monthly.push(newValue);
      let earning: number = newValue - accumulator;
      monthlyEarning.push(earning);
      accumulator = newValue;
    }

    let total = accumulator;
    let original = parseFloat(details.monthlyValue) * numberOfMonths + parseFloat(details.initialValue);;
    let gainings = total - original;
    let gainingPercentage = (gainings / original) * 100;

    return new ValueProjectionData(
      monthly,
      monthlyEarning,
      total,
      original,
      gainings,
      gainingPercentage,
      details.description
    );
  }

  private totalFrom(
    projections: Array<ValueProjectionData>,
    maximumTime: number
  ): ValueProjectionData {
    let description = "Total";

    let projectionsCount: number = projections.length;

    if (!(projectionsCount > 0)) {
      throw "Missing Data";
    }

    let numberOfMonths: number = maximumTime * 12;

    let total = 0;
    let original = 0;
    let gainings = 0;
    let gainingPercentage = 0;
    let monthly = new Array(numberOfMonths).fill(0);
    let monthlyEarning = new Array(numberOfMonths).fill(0);;

console.log(projections)
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
