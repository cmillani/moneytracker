import { Goal } from "./interfaces/goal";
import { v4 as uuid } from "uuid";

export class NewCarGoal implements Goal {

    constructor(
        public id: string = uuid()
    ) { }
}