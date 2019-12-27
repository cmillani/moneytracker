import { Goal } from "./interfaces/goal";

export class NewSimpleGoal implements Goal {

    constructor(
        public itemValue: number, 
        public monthlyInterest: number, 
        public numberOfInstallments: number
    ) { }
}