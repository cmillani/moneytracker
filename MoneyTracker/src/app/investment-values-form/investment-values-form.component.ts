import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InvestmentDetails } from '../investment-details'

@Component({
  selector: 'app-investment-values-form',
  templateUrl: './investment-values-form.component.html',
  styleUrls: ['./investment-values-form.component.css']
})
export class InvestmentValuesFormComponent implements OnInit {

  constructor() { }

  formDetails: InvestmentDetails = new InvestmentDetails();
  investments: Array<InvestmentDetails> = []
  @Output() formDetailsEmitter: EventEmitter<Array<InvestmentDetails>> = new EventEmitter<Array<InvestmentDetails>>();

  ngOnInit() {
    this.formDetailsEmitter.emit([]);
  }

  addNewInvestment() {
    this.investments.push(this.formDetails);
    this.formDetails = new InvestmentDetails();
    this.formDetailsEmitter.emit(this.investments);
  }

}
