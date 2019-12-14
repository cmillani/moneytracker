import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { InvestmentDetails } from './investment-details'
import { InvestedProjections } from './invested-projections'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MoneyTracker';

  public totalAmountData: ChartDataSets[] = [
    { data: [0], label: 'All Money' },
  ];
  public earningsData: ChartDataSets[] = [
    { data: [0], label: 'All Earnings' },
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

  updatedValues(formValues: InvestmentDetails) {
    let data: InvestedProjections = this.generateData(formValues);
    this.totalAmountData = [
      { data: data.monthlyTotal, label: 'All Money' },
      { data: data.monthlySaved, label: 'Invested' },
      { data: data.monthlyInvested, label: 'Saved' },
    ]
    this.earningsData = [
      { data: data.monthlyEarnings, label: 'All Earnings' },
      { data: data.monthlySavedEarnings, label: 'Saved Earnings' },
      { data: data.monthlyInvestedEarnings, label: 'Invested Earnings' },
    ]

    this.lineChartLabels = this.generateLabels(data.monthlyTotal.length);
  }

  generateLabels(count: number) : Array<string>  {
    let labels: Array<string> = []
    for(var i = 0; i < count; i++) {
      labels.push(`${i + 1}`)
    }
    return labels
  }

  generateData(formDetails: InvestmentDetails) : InvestedProjections {
    let monthlyTotal: Array<number> = []
    let monthlySavings: Array<number> = []
    let monthlyInvested: Array<number> = []

    let monthlyEarnings: Array<number> = []
    let monthlySavingsEarnings: Array<number> = []
    let monthlyInvestedEarnings: Array<number> = []

    let saved: number = 0
    let invested: number = 0

    let numberOfMonths: number = formDetails.numberOfYears * 12;

    for (var i = 0; i < numberOfMonths; i++) {
      saved += formDetails.monthlySavings;
      let newSaved: number = saved * (1 + formDetails.savingsInterest);
      monthlySavings.push(newSaved);
      let savedEarning: number = newSaved - saved
      monthlySavingsEarnings.push(savedEarning)
      saved = newSaved;

      invested += formDetails.monthlyInvestment;
      let newInvested = invested * (1 + formDetails.investmentInterest);
      monthlyInvested.push(newInvested);
      let investedEarning: number = newInvested - invested;
      monthlyInvestedEarnings.push(investedEarning);
      invested = newInvested;

      monthlyTotal.push(saved + invested);
      monthlyEarnings.push(investedEarning + savedEarning);
    }

    return new InvestedProjections(monthlyTotal, monthlyInvested, monthlySavings, monthlyEarnings, monthlyInvestedEarnings, monthlySavingsEarnings)
  }
}
