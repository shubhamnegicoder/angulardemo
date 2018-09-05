import { TestBed, inject } from '@angular/core/testing';

import { VendorModuleService } from './vendor-module.service';

describe('VendorModuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorModuleService]
    });
  });

  it('should be created', inject([VendorModuleService], (service: VendorModuleService) => {
    expect(service).toBeTruthy();
  }));
});
