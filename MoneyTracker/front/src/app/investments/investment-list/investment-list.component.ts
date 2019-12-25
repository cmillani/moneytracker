import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

import { InvestmentDetails } from "../../models/investment-details";
import { InvestmentListService } from "../../services/investment-list.service";
import { EditInvestmentModalComponent } from "../edit-investment-modal/edit-investment-modal.component";

@Component({
  selector: "app-investment-list",
  templateUrl: "./investment-list.component.html",
  styleUrls: ["./investment-list.component.css"]
})
export class InvestmentListComponent implements OnInit {
  @Output() investmentListEmitter: EventEmitter<void> = new EventEmitter<
    void
  >();

  investmentList: Array<InvestmentDetails> = [new InvestmentDetails()];
  dataSource: MatTableDataSource<InvestmentDetails> = new MatTableDataSource<
    InvestmentDetails
  >(this.investmentList);

  investmentsRows = [
    "description",
    "years",
    "initialDate",
    "initial",
    "monthly",
    "interest",
    "actions"
  ];

  constructor(
    public investmentListService: InvestmentListService,
    public dialog: MatDialog
  ) {}

  reloadData() {
    this.dataSource.data = this.investmentListService.getAll();
  }

  deleteRow(element: InvestmentDetails) {
    this.investmentListService.remove(element);
    this.investmentListEmitter.emit();
    this.reloadData();
  }

  editRow(element: InvestmentDetails) {
    const dialogRef = this.dialog.open(EditInvestmentModalComponent, {
      width: "800px",
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return
      }
      this.investmentListService.update(result);
      this.investmentListEmitter.emit();
      this.reloadData();
    });
  }

  ngOnInit() {
    this.reloadData();
  }
}
