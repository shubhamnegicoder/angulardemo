import { TestBed, inject } from '@angular/core/testing';

import { EditstockadjustmentService } from './editstockadjustment.service';

describe('EditstockadjustmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditstockadjustmentService]
    });
  });

  it('should be created', inject([EditstockadjustmentService], (service: EditstockadjustmentService) => {
    expect(service).toBeTruthy();
  }));
});
