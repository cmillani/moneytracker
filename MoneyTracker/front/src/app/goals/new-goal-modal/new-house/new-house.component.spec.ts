import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHouseComponent } from './new-house.component';

describe('NewHouseComponent', () => {
  let component: NewHouseComponent;
  let fixture: ComponentFixture<NewHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
