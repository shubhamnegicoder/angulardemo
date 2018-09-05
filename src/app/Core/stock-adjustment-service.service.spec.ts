import { TestBed, inject } from '@angular/core/testing';

import { StockAdjustmentServiceService } from './stock-adjustment-service.service';

describe('StockAdjustmentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockAdjustmentServiceService]
    });
  });

  it('should be created', inject([StockAdjustmentServiceService], (service: StockAdjustmentServiceService) => {
    expect(service).toBeTruthy();
  }));
});
