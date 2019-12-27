import { Injectable } from '@angular/core';
import { Goal } from '../models/interfaces/goal';
import { GoalRepositoryService } from '../repositories/goal-repository.service';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(public goalRepository: GoalRepositoryService) { }

  addGoal(goal: Goal) {
    this.goalRepository.addGoal(goal);
  }

  getGoals(): Array<Goal> {
    return this.goalRepository.getGoals();
  }

  editGoal(goal: Goal) {
    this.goalRepository.editGoal(goal);
  }

  removeGoal(goal: Goal) {
    this.goalRepository.removeGoal(goal);
  }
}
