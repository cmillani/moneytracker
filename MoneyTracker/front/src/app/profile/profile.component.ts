import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";

import { Profile } from "../models/profile";
import { ProfileService } from "../services/profile.service";
import { RecurringExpense } from "../models/recurring-expense";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent {
  private profile: Profile;
  private profileService: ProfileService;
  private expense: RecurringExpense;

  dataSource: MatTableDataSource<RecurringExpense>;

  expensesRows = ["name", "value", "delete"];

  constructor(profileService: ProfileService) {
    this.profileService = profileService;
    this.profile = this.profileService.getProfile();
    this.expense = new RecurringExpense();
    this.dataSource = new MatTableDataSource<RecurringExpense>(this.profile.expenses);
  }

  reloadData() {
    this.profile = this.profileService.getProfile();
    this.dataSource.data = this.profile.expenses;
  }

  updatedProfile() {
    this.profileService.setProfile(this.profile);
  }

  addExpense() {
    this.profileService.addRecurringExpense(this.expense);
    this.expense = new RecurringExpense();
    this.reloadData();
  }

  deleteRow(expense: RecurringExpense) {
    this.profileService.removeRecurringExpense(expense);
    this.reloadData();
  }
}
