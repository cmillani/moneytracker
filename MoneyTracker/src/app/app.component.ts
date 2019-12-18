import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ProjectionGraphsComponent } from './projection-graphs/projection-graphs.component';
import { InvestmentListComponent } from './investment-list/investment-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  title = 'MoneyTracker';
  @ViewChild(ProjectionGraphsComponent, {static: false}) projectionGraphs: ProjectionGraphsComponent;
  @ViewChild(InvestmentListComponent, {static: false}) investmentList: InvestmentListComponent;

  constructor() { }

  updatedValues() {
    this.projectionGraphs.reloadData();
    this.investmentList.reloadData();
  }

  ngAfterViewInit() {
    this.projectionGraphs.reloadData();
    this.investmentList.reloadData();
  }
}
