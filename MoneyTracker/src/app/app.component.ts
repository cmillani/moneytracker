import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { InvestmentDetails } from './investment-details';
import { ProjectionGraphsComponent } from './projection-graphs/projection-graphs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  title = 'MoneyTracker';
  @ViewChild(ProjectionGraphsComponent, {static: false}) projectionGraphs: ProjectionGraphsComponent;
  investments: Array<InvestmentDetails> = [];

  constructor() { }

  updatedValues(investments: Array<InvestmentDetails>) {
    this.investments = [...investments];
    // this.investments = investments;
    if (this.projectionGraphs != null && this.projectionGraphs != undefined) {
      this.projectionGraphs.updatedValues(investments)
    }
  }

  ngAfterViewInit() {
    this.projectionGraphs.updatedValues(this.investments);
  }
}
