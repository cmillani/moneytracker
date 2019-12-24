import { Injectable } from "@angular/core";
import { InvestmentDetails } from "../models/investment-details";

@Injectable({
  providedIn: "root"
})
export class InvestmentRepositoryService {
  constructor() {}

  private investmentsKey: string = "INVESTMENTS-LIST-KEY"

  getInvestments(): Array<InvestmentDetails> {
    let jsonList: string = localStorage.getItem(this.investmentsKey);
    if (jsonList == null) {
      return [];
    } else {
      return JSON.parse(jsonList);
    }
  }

  setInvestments(investments: Array<InvestmentDetails>) {
    localStorage.setItem(this.investmentsKey, JSON.stringify(investments));
  }
}
