import { TestBed } from '@angular/core/testing';

import { ProfileRepositoryService } from './profile-repository.service';

describe('ProfileRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileRepositoryService = TestBed.get(ProfileRepositoryService);
    expect(service).toBeTruthy();
  });
});
