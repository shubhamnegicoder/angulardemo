import { TestBed, inject } from '@angular/core/testing';

import { TransferOrderService } from './transfer-order.service';

describe('TransferOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferOrderService]
    });
  });

  it('should be created', inject([TransferOrderService], (service: TransferOrderService) => {
    expect(service).toBeTruthy();
  }));
});
