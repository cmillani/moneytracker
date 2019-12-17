import { Component, Input } from '@angular/core';
import { InvestmentDetails } from '../investment-details';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.css']
})
export class InvestmentListComponent {

  @Input() investmentList: Array<InvestmentDetails> = [];

  investmentsRows = ["description", "years", "initial", "monthly", "interest"];

  constructor() { }
}
