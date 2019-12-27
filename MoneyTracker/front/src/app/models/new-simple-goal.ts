import { Goal } from "./interfaces/goal";
import { v4 as uuid } from "uuid";

export class NewSimpleGoal implements Goal {

    constructor(
        public itemValue: number, 
        public monthlyInterest: number, 
        public numberOfInstallments: number,
        public id: string = uuid()
    ) { }
}