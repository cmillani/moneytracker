import { Component, Input, Output, EventEmitter } from "@angular/core";
import { InvestmentDetails } from "../../models/investment-details";
import { InvestmentListService } from "../../services/investment-list.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-investment-values-form",
  templateUrl: "./investment-values-form.component.html",
  styleUrls: ["./investment-values-form.component.css"]
})
export class InvestmentValuesFormComponent {
  constructor(public investmentListService: InvestmentListService) {}

  @Input() formDetails: InvestmentDetails = new InvestmentDetails();
}
