import { TestBed } from '@angular/core/testing';

import { ProjectionsService } from './projections.service';

describe('ProjectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectionsServiceService = TestBed.get(ProjectionsService);
    expect(service).toBeTruthy();
  });
});
