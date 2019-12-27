import { Component } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { NewGoalModalComponent } from './new-goal-modal/new-goal-modal.component';
import { Goal } from '../models/interfaces/goal';
import { GoalService } from '../services/goal.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {

  dataSource: MatTableDataSource<Goal> = new MatTableDataSource<Goal>([]);
  rows: Array<string> = ["icon", "description", "value", "actions"];

  constructor(public dialog: MatDialog, public goalService: GoalService) { 
    this.reloadData()
  }

  reloadData() {
    this.dataSource.data = this.goalService.getGoals();
  }

  deleteRow(goal: Goal) {
    this.goalService.removeGoal(goal);
    this.reloadData();
  }

  addNewGoal() {
    const dialogRef = this.dialog.open(NewGoalModalComponent, {
      width: "800px"
    });

    dialogRef.afterClosed().subscribe( _ => {
      this.reloadData();
    });
  }

}
