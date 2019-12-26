import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-new-goal-modal',
  templateUrl: './new-goal-modal.component.html',
  styleUrls: ['./new-goal-modal.component.css']
})
export class NewGoalModalComponent {

  constructor(public dialogRef: MatDialogRef<NewGoalModalComponent>) { }

  onNoClick() {
    this.dialogRef.close();
  }
}
