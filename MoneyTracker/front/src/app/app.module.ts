import "./number.extension";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatTooltipModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatDividerModule,
  MatDialogModule,
  MatCheckboxModule,
  MatTabsModule
} from "@angular/material";
import { InvestmentValuesFormComponent } from "./investments/investment-values-form/investment-values-form.component";

import { ChartsModule } from "ng2-charts";
import { ProjectionGraphsComponent } from "./investments/projection-graphs/projection-graphs.component";

import { NgxMaskModule, IConfig } from "ngx-mask";
import { InvestmentListComponent } from "./investments/investment-list/investment-list.component";
import { InvestmentsComponent } from "./investments/investments.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { GoalsComponent } from "./goals/goals.component";
import { EditInvestmentModalComponent } from "./investments/edit-investment-modal/edit-investment-modal.component";
import { NewGoalModalComponent } from './goals/new-goal-modal/new-goal-modal.component';
import { NewCarComponent } from './goals/new-goal-modal/new-car/new-car.component';
import { NewHouseComponent } from './goals/new-goal-modal/new-house/new-house.component';
import { NewSimpleGoalComponent } from './goals/new-goal-modal/new-simple-goal/new-simple-goal.component';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = ({} = {});

const modules = [
  MatDividerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatInputModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatCheckboxModule,
  MatTabsModule,
  NgxMaskModule.forRoot(options)
];

@NgModule({
  declarations: [
    AppComponent,
    InvestmentValuesFormComponent,
    ProjectionGraphsComponent,
    InvestmentListComponent,
    InvestmentsComponent,
    HomeComponent,
    ProfileComponent,
    GoalsComponent,
    EditInvestmentModalComponent,
    NewGoalModalComponent,
    NewCarComponent,
    NewHouseComponent,
    NewSimpleGoalComponent
  ],
  exports: [],
  imports: [...modules, FormsModule, ChartsModule, BrowserModule, AppRoutingModule, NoopAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditInvestmentModalComponent, NewGoalModalComponent]
})
export class AppModule {}
