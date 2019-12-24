import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionGraphsComponent } from './projection-graphs.component';

describe('ProjectionGraphsComponent', () => {
  let component: ProjectionGraphsComponent;
  let fixture: ComponentFixture<ProjectionGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectionGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
