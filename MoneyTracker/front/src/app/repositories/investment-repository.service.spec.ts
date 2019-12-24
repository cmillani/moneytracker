/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvestmentRepositoryService } from './investment-repository.service';

describe('Service: InvestmentRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestmentRepositoryService]
    });
  });

  it('should ...', inject([InvestmentRepositoryService], (service: InvestmentRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
