import './number.extension';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatTooltipModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { InvestmentValuesFormComponent } from './investment-values-form/investment-values-form.component'

import { ChartsModule } from 'ng2-charts';

const modules = [
  MatInputModule,
  MatFormFieldModule,
  MatTooltipModule
]

@NgModule({
  declarations: [
    AppComponent,
    InvestmentValuesFormComponent
  ],
  exports: [
    ...modules
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
