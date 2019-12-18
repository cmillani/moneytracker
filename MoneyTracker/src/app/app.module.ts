import './number.extension';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatTooltipModule, MatInputModule, MatFormFieldModule, MatTableModule, MatButtonModule, MatIconModule } from '@angular/material';
import { InvestmentValuesFormComponent } from './investment-values-form/investment-values-form.component'

import { ChartsModule } from 'ng2-charts';
import { ProjectionGraphsComponent } from './projection-graphs/projection-graphs.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { InvestmentListComponent } from './investment-list/investment-list.component'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {} = {};;

const modules = [
  MatInputModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  NgxMaskModule.forRoot(options)
]

@NgModule({
  declarations: [
    AppComponent,
    InvestmentValuesFormComponent,
    ProjectionGraphsComponent,
    InvestmentListComponent
  ],
  exports: [
  ],
  imports: [
    ...modules,
    FormsModule,
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
