import { Injectable } from '@angular/core';
import { Goal } from '../models/interfaces/goal';

@Injectable({
  providedIn: 'root'
})
export class GoalRepositoryService {

  constructor() { }

  private goalsKey: string = "GOALS-LIST-KEY"

  addGoal(goal: Goal) {
    let goals: Array<Goal> = this.getGoals();
    goals.push(goal);
    localStorage.setItem(this.goalsKey, JSON.stringify(goals));
  }

  getGoals(): Array<Goal> {
    let jsonList: string = localStorage.getItem(this.goalsKey);
    if (jsonList == null) {
      return [];
    } else {
      return JSON.parse(jsonList);
    }
  }

  editGoal(goal: Goal) {
    let goals: Array<Goal> = this.getGoals();
    let index: number = goals.findIndex(element => element.id == goal.id);
    goals[index] = goal;
    localStorage.setItem(this.goalsKey, JSON.stringify(goals));
  }

  removeGoal(goal: Goal) {
    let goals: Array<Goal> = this.getGoals();
    let index: number = goals.findIndex(element => element.id == goal.id);
    goals.splice(index, 1);
    localStorage.setItem(this.goalsKey, JSON.stringify(goals));
  }
}
