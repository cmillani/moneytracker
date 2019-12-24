import { Component, OnInit } from '@angular/core';
import { ProjectionsService } from '../../services/projections.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { InvestmentDetails } from '../../models/investment-details';
import { InvestedProjections } from '../../models/invested-projections';
import { InvestmentListService } from '../../services/investment-list.service';

@Component({
  selector: 'app-projection-graphs',
  templateUrl: './projection-graphs.component.html',
  styleUrls: ['./projection-graphs.component.css']
})
export class ProjectionGraphsComponent implements OnInit {

  projectionsService: ProjectionsService;
  investmentListService: InvestmentListService;

  investmentProjection: InvestedProjections;

  constructor(projectionsService : ProjectionsService, investmentListService: InvestmentListService) {
    this.projectionsService = projectionsService;
    this.investmentListService = investmentListService;
    this.investmentProjection = this.projectionsService.projectionsFrom([]);
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

  totalColumns: string[] = ['description', 'total', 'original', 'gainings'];
  monthlyColumns: string[] = ['description', 'monthly'];

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.updatedValues(this.investmentListService.getAll());
  }

  generateLabels(count: number) : Array<string>  {
    let labels: Array<string> = []
    for(var i = 0; i < count; i++) {
      labels.push(`${i + 1}`)
    }
    return labels
  }

  updatedValues(investments: Array<InvestmentDetails>) {
    let data: InvestedProjections = this.projectionsService.projectionsFrom(investments);

    this.investmentProjection = data
    this.totalAmountData = [
      ...data.investments.map(investment => {return {data: investment.monthly, label: investment.description}}),
      { data: data.total.monthly, label: data.total.description },
    ]
    this.earningsData = [
      ...data.investments.map(investment => {return {data: investment.monthlyEarning, label: investment.description}}),
      { data: data.total.monthlyEarning, label: data.total.description },
    ]

    this.lineChartLabels = this.generateLabels(data.total.monthly.length);
  }

}
