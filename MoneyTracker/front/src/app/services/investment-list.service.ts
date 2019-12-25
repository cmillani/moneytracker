import { Injectable } from "@angular/core";
import { InvestmentDetails } from "../models/investment-details";
import { InvestmentRepositoryService } from "../repositories/investment-repository.service";
import { ProfileService } from "./profile.service";
import { RemainingToInvest } from "../models/remaining-to-invest";

@Injectable({
  providedIn: "root"
})
export class InvestmentListService {
  private investmentList: Array<InvestmentDetails> = [];

  constructor(public investmentRepository: InvestmentRepositoryService, public profileService: ProfileService) {
    this.investmentList = investmentRepository.getInvestments();
  }

  valueAvailable(): RemainingToInvest {
    let finalYear: number = Math.max(
      0,
      ...this.investmentList.map(element => element.numberOfYears + element.startingYear)
    );
    let expenses: Array<number> = Array(finalYear).fill(0);
    for (let investment of this.investmentList) {
      for (var i = investment.startingYear; i < investment.numberOfYears + investment.startingYear; i++) {
        expenses[i] += parseFloat(investment.monthlyValue);
      }
    }
    let availableValues: Array<number> = [];

    let startingYear = 0;
    let endingYear = 0;
    let value = 0;

    if (expenses.length == 0) {
      value = this.profileService.getProfile().desiredSavings;
    }

    for (let expense of expenses) {
      let currentValue = this.profileService.getProfile().desiredSavings - expense;
      if (value > 0) {
        // Already found a value to set
        if (currentValue == value) {
          endingYear++;
        } else {
          break;
        }
      } else if (currentValue > 0) {
        value = currentValue;
      } else {
        startingYear++;
        endingYear++;
      }
    }

    return new RemainingToInvest(value, startingYear, endingYear);
  }

  getAll(): Array<InvestmentDetails> {
    return [...this.investmentList];
  }

  add(investment: InvestmentDetails) {
    this.investmentList.push(investment);
    this.investmentRepository.setInvestments(this.investmentList);
  }

  remove(investment: InvestmentDetails) {
    let index: number = this.investmentList.indexOf(investment);
    this.investmentList.splice(index, 1);
    this.investmentRepository.setInvestments(this.investmentList);
  }

  update(investment: InvestmentDetails) {
    let index: number = this.investmentList.findIndex(element => element.id == investment.id);
    this.investmentList[index] = investment;
    this.investmentRepository.setInvestments(this.investmentList);
  }
}
