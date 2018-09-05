import { TestBed, inject } from '@angular/core/testing';

import { SubBrandService } from './sub-brand.service';

describe('SubBrandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubBrandService]
    });
  });

  it('should be created', inject([SubBrandService], (service: SubBrandService) => {
    expect(service).toBeTruthy();
  }));
});
