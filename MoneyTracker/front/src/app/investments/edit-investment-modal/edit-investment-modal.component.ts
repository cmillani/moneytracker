import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InvestmentDetails } from "../../models/investment-details";

@Component({
  selector: "app-edit-investment-modal",
  templateUrl: "./edit-investment-modal.component.html",
  styleUrls: ["./edit-investment-modal.component.css"]
})
export class EditInvestmentModalComponent {
  public editingInvestment: InvestmentDetails;

  constructor(
    public dialogRef: MatDialogRef<EditInvestmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvestmentDetails
  ) {
    this.editingInvestment = Object.assign({}, data);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
