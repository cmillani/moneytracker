import { TestBed } from '@angular/core/testing';

import { InvestmentListService } from './investment-list.service';

describe('InvestmentListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestmentListService = TestBed.get(InvestmentListService);
    expect(service).toBeTruthy();
  });
});
