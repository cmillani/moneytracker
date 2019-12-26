import { Component, ViewChild, ElementRef } from "@angular/core";
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

  @ViewChild('valueInput', {static: false}) set content(content: ElementRef) {
    if (content) {
      setTimeout(() => content.nativeElement.focus(), 0);
    }
  }


  dataSource: MatTableDataSource<RecurringExpense>;

  expensesRows = ["name", "value", "delete"];

  editingElements: Object = {}

  constructor(profileService: ProfileService) {
    this.profileService = profileService;
    this.profile = this.profileService.getProfile();
    this.expense = new RecurringExpense();
    this.dataSource = new MatTableDataSource<RecurringExpense>(this.profile.expenses);
  }

  toggleEditing(index) {
    this.editingElements[index] = this.editingElements[index] != null ? !this.editingElements[index] : true;
    this.updatedProfile();
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
