import { Injectable } from "@angular/core";
import { InvestmentDetails } from "../models/investment-details";
import { InvestmentRepositoryService } from "../repositories/investment-repository.service";
import { ProfileService } from "./profile.service"

@Injectable({
  providedIn: "root"
})
export class InvestmentListService {
  private investmentList: Array<InvestmentDetails> = [];

  constructor(public investmentRepository: InvestmentRepositoryService, public profileService: ProfileService) {
    this.investmentList = investmentRepository.getInvestments();
  }

  valueAvailable(): number {
    return this.profileService.getProfile().desiredSavings - this.investmentList.reduce((acc, element) => acc + parseFloat(element.monthlyValue) ,0)
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
    let index: number = this.investmentList.findIndex((element) => element.id == investment.id);
    this.investmentList[index] = investment;
    this.investmentRepository.setInvestments(this.investmentList);
  }
}
