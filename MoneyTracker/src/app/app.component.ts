import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { InvestmentDetails } from './investment-details';
import { InvestedProjections } from './invested-projections';
import { ProjectionsService } from './projections.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'MoneyTracker';
  projectionsService: ProjectionsService

  constructor(projectionsService : ProjectionsService) {
    this.projectionsService = projectionsService
  }

  public totalAmountData: ChartDataSets[] = [
    { data: [0], label: '-' },
  ];
  public earningsData: ChartDataSets[] = [
    { data: [0], label: '-' },
  ];
  public lineChartLabels: Label[] = this.generateLabels(1);
  public lineChartOptions: ChartOptions = {
    responsive: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  investmentProjection: InvestedProjections

  updatedValues(formValues: InvestmentDetails) {
    let data: InvestedProjections = this.projectionsService.procectionsFrom(formValues);

    this.investmentProjection = data
    this.totalAmountData = [
      { data: data.total.monthly, label: data.total.description },
      { data: data.saved.monthly, label: data.saved.description },
      { data: data.invested.monthly, label: data.invested.description },
    ]
    this.earningsData = [
      { data: data.total.monthlyEarning, label: data.total.description },
      { data: data.saved.monthlyEarning, label: data.saved.description },
      { data: data.invested.monthlyEarning, label: data.invested.description },
    ]

    this.lineChartLabels = this.generateLabels(data.total.monthly.length);
  }

  generateLabels(count: number) : Array<string>  {
    let labels: Array<string> = []
    for(var i = 0; i < count; i++) {
      labels.push(`${i + 1}`)
    }
    return labels
  }
}
