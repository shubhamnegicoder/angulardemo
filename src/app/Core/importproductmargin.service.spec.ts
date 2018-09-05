import { TestBed, inject } from '@angular/core/testing';

import { ImportproductmarginService } from './importproductmargin.service';

describe('ImportproductmarginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportproductmarginService]
    });
  });

  it('should be created', inject([ImportproductmarginService], (service: ImportproductmarginService) => {
    expect(service).toBeTruthy();
  }));
});
