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
  investmentDetails: InvestmentDetails = new InvestmentDetails();

  constructor() { }

  updatedValues(formValues: InvestmentDetails) {
    this.investmentDetails = formValues;
    if (this.projectionGraphs != null && this.projectionGraphs != undefined) {
      this.projectionGraphs.updatedValues(formValues)
    }
  }

  ngAfterViewInit() {
    this.projectionGraphs.updatedValues(this.investmentDetails);
  }
}
