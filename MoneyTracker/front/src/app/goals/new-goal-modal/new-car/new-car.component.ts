import { Component } from '@angular/core';
import { GoalForm } from '../new-goal-modal.component';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements GoalForm {

  constructor() { }

  submit() {
    
  }

  isValid(): boolean {
    return false;
  }

}
