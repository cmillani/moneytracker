import { Injectable } from "@angular/core";
import { ValueProjectionData } from "../models/value-projection-data";
import { InvestedProjections } from "../models/invested-projections";
import { InvestmentDetails } from "../models/investment-details";
import { ProfileService } from "./profile.service";

class Reajusts {
  accepted: number;
  required: number;

  constructor(accepted: number, required: number) {
    this.accepted = accepted;
    this.required = required;
  }
}

@Injectable({
  providedIn: "root"
})
export class ProjectionsService {
  constructor(public profileService: ProfileService) { }

  projectionsFrom(details: Array<InvestmentDetails>): InvestedProjections {
    let maximumTime: number = details.reduce((max, current) => {
      return Math.max(max, current.numberOfYears + current.startingYear);
    }, 0);
    let projections: Array<ValueProjectionData> = this.generateEmptyProjectionsFrom(details);
    for (let i = 0; i < maximumTime * 12; i++) {
      this.advanceOneMonthOf(projections, i);
      if (this.profileService.getProfile().keepInvestmentProportion) {
        this.readjustIfNeeded(projections, i);
      }
    }
    this.adjustTotalsFrom(projections);

    let total: ValueProjectionData;
    if (projections.length > 0) {
      total = this.totalFrom(projections, maximumTime);
    } else {
      total = new ValueProjectionData([], [], 0, 0, 0, 0, "Total", 0, null);
    }

    return new InvestedProjections(projections, total);
  }

  private generateEmptyProjectionsFrom(details: Array<InvestmentDetails>): Array<ValueProjectionData> {
    let projections: Array<ValueProjectionData> = [];
    for (let detail of details) {
      projections.push(new ValueProjectionData([], [], 0, 0, 0, 0, detail.description, 0, detail));
    }
    return projections;
  }

  private advanceOneMonthOf(projections: Array<ValueProjectionData>, currentMonth: number) {
    for (let projection of projections) {
      let startingMonth: number = projection.details.startingYear * 12;
      let numberOfMonths: number = projection.details.numberOfYears * 12 + startingMonth;
      if (currentMonth < startingMonth) {
        projection.monthly.push(0);
        projection.monthlyEarning.push(0);
      } else {
        let interest: number = parseFloat(projection.details.interest) / 100;
        let currentValue: number =
          startingMonth == currentMonth
            ? parseFloat(projection.details.initialValue)
            : projection.monthly[currentMonth - 1];
        currentValue += parseFloat(projection.details.monthlyValue);
        let newValue = currentValue * (1 + interest);
        projection.monthly.push(newValue);
        projection.monthlyEarning.push(newValue - currentValue);
      }
    }
  }

  private readjustIfNeeded(projections: Array<ValueProjectionData>, currentMonth: number) {
    let projectionsToAnalyse: Array<ValueProjectionData> = this.activeInvestmentsFrom(projections, currentMonth);
    let originalPercentages: Array<number> = this.percentagesFrom(projectionsToAnalyse);
    let currentPercentages: Array<number> = this.currentPercentagesFrom(projectionsToAnalyse, currentMonth);
    let total: number = projectionsToAnalyse.reduce(
      (acc, current) => acc + (current.monthly.length > 0 ? current.monthly[currentMonth] : 0),
      0
    );

    let allowedPercentage: number = this.profileService.getProfile().toleratedProportionDifference / 100;
    let reajusts: Array<Reajusts> = [];
    for (var i in originalPercentages) {
      let difference: number = -(currentPercentages[i] - originalPercentages[i]);

      let acceptedReajust: number = (difference + Math.sign(difference) * allowedPercentage) * total;
      
      let positiveReajustNeeds: number = Math.abs(difference) - allowedPercentage;
      let neededToReajust: number = positiveReajustNeeds < 0 ? 0 : Math.sign(difference) * positiveReajustNeeds * total;
      
      reajusts.push(new Reajusts(acceptedReajust, neededToReajust));
    }
    this.redistributePositiveMoney(projectionsToAnalyse, currentMonth, reajusts, originalPercentages);
  }

  private redistributePositiveMoney(
    projections: Array<ValueProjectionData>,
    currentMonth: number,
    reajusts: Array<Reajusts>,
    originalPercentages: Array<number>
  ) {
    let moneyToDistribute: number = reajusts.reduce((acc, current, index) => {
      if (current.required < 0) {
        projections[index].monthly[currentMonth] += current.required;
        return acc - current.required;
      } else {
        return acc;
      }
    }, 0);

    let percentageToReceiveMoney: number = reajusts.reduce((acc, current, index) => {
      if (current.accepted > 0) {
        return acc + originalPercentages[index];
      } else {
        return acc;
      }
    }, 0);
    if (moneyToDistribute > 0 && percentageToReceiveMoney > 0) {
      for (let index in projections) {
        if (reajusts[index].accepted > 0) {
          let maximumAccepted: number = reajusts[index].accepted;
          let maximumToGive: number = (originalPercentages[index] / percentageToReceiveMoney) * moneyToDistribute;
          let toGive: number = Math.min(maximumAccepted, maximumToGive);
          projections[index].monthly[currentMonth] += toGive;
        }
      }
    }
  }

  private activeInvestmentsFrom(
    projections: Array<ValueProjectionData>,
    currentMonth: number
  ): Array<ValueProjectionData> {
    return projections.filter(element => {
      let hasStarted: boolean = currentMonth >= element.details.startingYear * 12;
      let hasNotEnded: boolean = currentMonth < element.details.startingYear * 12 + element.details.numberOfYears * 12;

      return hasStarted && hasNotEnded;
    });
  }

  private currentPercentagesFrom(projections: Array<ValueProjectionData>, currentMonth: number) {
    let total: number = projections.reduce(
      (acc, current) => acc + (current.monthly.length > 0 ? current.monthly[currentMonth] : 0),
      0
    );
    let percentages: Array<number> = [];

    for (let investment of projections) {
      percentages.push((investment.monthly.length > 0 ? investment.monthly[investment.monthly.length - 1] : 0) / total);
    }
    return percentages;
  }

  private percentagesFrom(projections: Array<ValueProjectionData>): Array<number> {
    let total: number = projections.reduce((acc, element) => acc + parseFloat(element.details.monthlyValue), 0);
    let percentages: Array<number> = [];

    for (let investment of projections) {
      percentages.push(parseFloat(investment.details.monthlyValue) / total);
    }
    return percentages;
  }

  private adjustTotalsFrom(projections: Array<ValueProjectionData>) {
    for (let projection of projections) {
      projection.total = projection.monthly.length > 0 ? projection.monthly[projection.monthly.length - 1] : 0;
      projection.original = parseFloat(projection.details.monthlyValue) * (projection.details.numberOfYears * 12) + parseFloat(projection.details.initialValue);
      projection.gainings = projection.total - projection.original;
      projection.gainingPercentage = (projection.gainings/projection.original);
      projection.finalMonthlyEarning = projection.monthlyEarning.length > 0 ? projection.monthlyEarning[projection.monthlyEarning.length - 1] : 0;

      projection.total = projection.total.roundTo2Places();
      projection.original = projection.original.roundTo2Places();
      projection.gainings = projection.gainings.roundTo2Places();
      projection.gainingPercentage = projection.gainingPercentage.roundTo2Places();
      projection.finalMonthlyEarning = projection.finalMonthlyEarning.roundTo2Places();
    }
  }

  private totalFrom(projections: Array<ValueProjectionData>, maximumTime: number): ValueProjectionData {
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
    let monthlyEarning = new Array(numberOfMonths).fill(0);

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
      total.roundTo2Places(),
      original.roundTo2Places(),
      gainings.roundTo2Places(),
      gainingPercentage.roundTo2Places(),
      description,
      monthlyEarning.length > 0 ? monthlyEarning[monthlyEarning.length - 1].roundTo2Places() : 0,
      null
    );
  }
}
