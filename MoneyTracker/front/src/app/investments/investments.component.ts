import { Component, ViewChild, AfterViewInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { ProjectionGraphsComponent } from "./projection-graphs/projection-graphs.component";
import { InvestmentListComponent } from "./investment-list/investment-list.component";
import { InvestmentDetails } from "../models/investment-details";
import { EditInvestmentModalComponent } from "./edit-investment-modal/edit-investment-modal.component";
import { InvestmentListService } from "../services/investment-list.service";

@Component({
  selector: "app-investments",
  templateUrl: "./investments.component.html",
  styleUrls: ["./investments.component.css"]
})
export class InvestmentsComponent implements AfterViewInit {
  @ViewChild(ProjectionGraphsComponent, { static: false })
  projectionGraphs: ProjectionGraphsComponent;
  @ViewChild(InvestmentListComponent, { static: false })
  investmentList: InvestmentListComponent;

  constructor(
    public dialog: MatDialog,
    public investmentListService: InvestmentListService
  ) {}

  addNewInvestment() {
    const dialogRef = this.dialog.open(EditInvestmentModalComponent, {
      width: "800px",
      data: new InvestmentDetails()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return
      }
      this.investmentListService.add(result);
      this.updatedValues();
    });
  }

  updatedValues() {
    this.projectionGraphs.reloadData();
    this.investmentList.reloadData();
  }

  ngAfterViewInit() {
    this.projectionGraphs.reloadData();
    this.investmentList.reloadData();
  }
}
