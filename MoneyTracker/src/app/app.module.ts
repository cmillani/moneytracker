import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { InvestmentValuesFormComponent } from './investment-values-form/investment-values-form.component'

const modules = [
  MatInputModule,
  MatFormFieldModule
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
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
