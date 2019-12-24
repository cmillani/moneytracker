import { Component, Output, EventEmitter } from '@angular/core';
import { InvestmentDetails } from '../../models/investment-details'
import { InvestmentListService } from '../../services/investment-list.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-investment-values-form',
  templateUrl: './investment-values-form.component.html',
  styleUrls: ['./investment-values-form.component.css']
})
export class InvestmentValuesFormComponent {
  investmentListService: InvestmentListService
  constructor(investmentListService: InvestmentListService) {
    this.investmentListService = investmentListService;
  }

  formDetails: InvestmentDetails = new InvestmentDetails();
  investments: Array<InvestmentDetails> = []
  @Output() formDetailsEmitter: EventEmitter<void> = new EventEmitter<void>();

  addNewInvestment() {
    this.investmentListService.add(this.formDetails);
    this.formDetails = new InvestmentDetails();
    this.formDetailsEmitter.emit();
  }
}
