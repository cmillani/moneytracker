import { Component, OnInit } from '@angular/core';
import { ProjectionsService } from '../projections.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { InvestmentDetails } from '../investment-details';
import { InvestedProjections } from '../invested-projections';

@Component({
  selector: 'app-projection-graphs',
  templateUrl: './projection-graphs.component.html',
  styleUrls: ['./projection-graphs.component.css']
})
export class ProjectionGraphsComponent implements OnInit {

  projectionsService: ProjectionsService
  investmentProjection: InvestedProjections
  
  constructor(projectionsService : ProjectionsService) { 
    this.projectionsService = projectionsService;
    this.updatedValues(new InvestmentDetails());
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
  }

  generateLabels(count: number) : Array<string>  {
    let labels: Array<string> = []
    for(var i = 0; i < count; i++) {
      labels.push(`${i + 1}`)
    }
    return labels
  }

  updatedValues(formValues: InvestmentDetails) {
    let data: InvestedProjections = this.projectionsService.projectionsFrom([formValues]);

    this.investmentProjection = data
    this.totalAmountData = [
      { data: data.total.monthly, label: data.total.description },
      // { data: data.saved.monthly, label: data.saved.description },
      // { data: data.invested.monthly, label: data.invested.description },
    ]
    this.earningsData = [
      { data: data.total.monthlyEarning, label: data.total.description },
      // { data: data.saved.monthlyEarning, label: data.saved.description },
      // { data: data.invested.monthlyEarning, label: data.invested.description },
    ]

    this.lineChartLabels = this.generateLabels(data.total.monthly.length);
  }

}
