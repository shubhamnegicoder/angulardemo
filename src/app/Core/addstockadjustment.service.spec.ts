import { TestBed, inject } from '@angular/core/testing';

import { AddstockadjustmentService } from './addstockadjustment.service';

describe('AddstockadjustmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddstockadjustmentService]
    });
  });

  it('should be created', inject([AddstockadjustmentService], (service: AddstockadjustmentService) => {
    expect(service).toBeTruthy();
  }));
});
