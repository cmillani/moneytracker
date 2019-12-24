import { Injectable } from "@angular/core";
import { Profile } from "../models/profile";
import { ProfileRepositoryService } from "../repositories/profile-repository.service";
import { RecurringExpense } from "../models/recurring-expense";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  private profileRepository: ProfileRepositoryService;

  constructor(profileRepository: ProfileRepositoryService) {
    this.profileRepository = profileRepository;
  }

  getProfile(): Profile {
    return this.profileRepository.getProfile();
  }

  setProfile(profile: Profile) {
    this.profileRepository.setProfile(profile);
  }

  addRecurringExpense(expense: RecurringExpense) {
    let profile: Profile = this.getProfile();
    profile.expenses.push(expense);
    this.setProfile(profile);
  }

  removeRecurringExpense(expense: RecurringExpense) {
    let profile: Profile = this.getProfile();
    let index: number = profile.expenses.indexOf(expense);
    profile.expenses.splice(index, 1);
    this.setProfile(profile);
  }

  remainingValueFor(profile: Profile): number {
    return profile.wage - profile.desiredSavings - profile.expenses.reduce( (acc, expense) => { return acc + expense.value }, 0 )
  }
}
