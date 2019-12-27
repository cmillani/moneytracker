import { Component, ViewChildren, QueryList } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl } from '@angular/forms';

export interface GoalForm {
  isValid(): boolean
  submit()
}

@Component({
  selector: 'app-new-goal-modal',
  templateUrl: './new-goal-modal.component.html',
  styleUrls: ['./new-goal-modal.component.css']
})
export class NewGoalModalComponent {

  selectedIndex: FormControl = new FormControl(0);

  @ViewChildren('goalForm') goalForms: QueryList<GoalForm>;

  constructor(public dialogRef: MatDialogRef<NewGoalModalComponent>) { }

  submit() {
    console.log(this.goalForms);
  }

  isValid(): boolean {
    return this.goalForms && this.goalForms.toArray()[this.selectedIndex.value].isValid();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
