import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewGoalModalComponent } from './new-goal-modal/new-goal-modal.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent {

  constructor(public dialog: MatDialog) { }

  addNewGoal() {
    const dialogRef = this.dialog.open(NewGoalModalComponent, {
      width: "800px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
