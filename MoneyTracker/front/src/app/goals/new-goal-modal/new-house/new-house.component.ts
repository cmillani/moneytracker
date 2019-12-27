import { Component } from '@angular/core';
import { GoalForm } from '../new-goal-modal.component';

@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.component.html',
  styleUrls: ['./new-house.component.css']
})
export class NewHouseComponent implements GoalForm {

  constructor() { }

  submit(): boolean {
    return false;
  }

  isValid(): boolean {
    return false;
  }

}
