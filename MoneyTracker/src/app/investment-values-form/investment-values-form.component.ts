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
  @Output() formDetailsEmitter: EventEmitter<InvestmentDetails> = new EventEmitter<InvestmentDetails>();

  ngOnInit() {
    this.formDetailsEmitter.emit(this.formDetails);
  }

  updatedValue() {
    this.formDetailsEmitter.emit(this.formDetails);
  }

}
