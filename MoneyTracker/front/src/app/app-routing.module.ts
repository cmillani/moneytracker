import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InvestmentsComponent } from "./investments/investments.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component"
import { GoalsComponent } from "./goals/goals.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "investments", component: InvestmentsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "goals", component: GoalsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
