import { TestBed } from '@angular/core/testing';

import { GoalRepositoryService } from './goal-repository.service';

describe('GoalRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoalRepositoryService = TestBed.get(GoalRepositoryService);
    expect(service).toBeTruthy();
  });
});
