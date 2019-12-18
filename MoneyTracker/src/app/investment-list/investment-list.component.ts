import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { InvestmentDetails } from '../investment-details';
import { InvestmentListService } from '../investment-list.service';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.css']
})
export class InvestmentListComponent implements OnInit {

  @Output() investmentListEmitter: EventEmitter<void> = new EventEmitter<void>();

  investmentList: Array<InvestmentDetails> = [new InvestmentDetails()];
  dataSource: MatTableDataSource<InvestmentDetails> = new MatTableDataSource<InvestmentDetails>(this.investmentList);

  investmentsRows = ["description", "years", "initial", "monthly", "interest", "delete"];
  investmentListService: InvestmentListService

  constructor(investmentListService: InvestmentListService) {
    this.investmentListService = investmentListService;
  }

  reloadData() {
    this.dataSource.data = this.investmentListService.getAll();
  }

  deleteRow(element: InvestmentDetails) {
    this.investmentListService.remove(element);
    this.investmentListEmitter.emit();
    this.reloadData();
  }

  ngOnInit() {
    this.reloadData();
  }
}
