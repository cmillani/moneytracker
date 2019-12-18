import { Injectable } from '@angular/core';
import { InvestmentDetails } from './investment-details';

@Injectable({
  providedIn: 'root'
})
export class InvestmentListService {

  private investmentList: Array<InvestmentDetails> = [];

  constructor() { }

  getAll(): Array<InvestmentDetails> {
    return [...this.investmentList];
  }

  add(investment: InvestmentDetails) {
    this.investmentList.push(investment);
  }

  remove(investment: InvestmentDetails) {
    let index: number = this.investmentList.indexOf(investment);
    this.investmentList.splice(index, 1);
  }
}
