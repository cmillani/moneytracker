import { Component, ViewChild } from '@angular/core';
import { NewSimpleGoal } from 'src/app/models/new-simple-goal';
import { NgForm } from '@angular/forms';
import { GoalForm } from '../new-goal-modal.component';
import { GoalService } from 'src/app/services/goal.service';

@Component({
  selector: 'app-new-simple-goal',
  templateUrl: './new-simple-goal.component.html',
  styleUrls: ['./new-simple-goal.component.css']
})
export class NewSimpleGoalComponent implements GoalForm {
  simpleGoal: NewSimpleGoal

  @ViewChild('simpleGoalForm',{static: false}) simpleGoalForm: NgForm;

  constructor(public goalService: GoalService) { 
    this.simpleGoal = new NewSimpleGoal(0, 0, 0);
  }

  submit(): boolean {
    if (!this.isValid()) { return false }

    this.goalService.addGoal(this.simpleGoal);
    return true;
  }

  isValid(): boolean {
    return this.simpleGoalForm && this.simpleGoalForm.form.valid;
  }

}
