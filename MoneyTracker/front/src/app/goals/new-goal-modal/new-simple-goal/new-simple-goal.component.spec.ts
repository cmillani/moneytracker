import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSimpleGoalComponent } from './new-simple-goal.component';

describe('NewSimpleGoalComponent', () => {
  let component: NewSimpleGoalComponent;
  let fixture: ComponentFixture<NewSimpleGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSimpleGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSimpleGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
