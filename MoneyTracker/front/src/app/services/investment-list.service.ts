import { Injectable } from "@angular/core";
import { InvestmentDetails } from "../models/investment-details";
import { InvestmentRepositoryService } from "../repositories/investment-repository.service";

@Injectable({
  providedIn: "root"
})
export class InvestmentListService {
  private investmentList: Array<InvestmentDetails> = [];

  investmentRepository: InvestmentRepositoryService

  constructor(investmentRepository: InvestmentRepositoryService) {
    this.investmentRepository = investmentRepository;
    this.investmentList = this.investmentRepository.getInvestments();
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
}
