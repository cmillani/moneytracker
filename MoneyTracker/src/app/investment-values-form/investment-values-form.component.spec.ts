import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentValuesFormComponent } from './investment-values-form.component';

describe('InvestmentValuesFormComponent', () => {
  let component: InvestmentValuesFormComponent;
  let fixture: ComponentFixture<InvestmentValuesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentValuesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentValuesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
