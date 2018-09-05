import { TestBed, inject } from '@angular/core/testing';

import { MarginService } from './margin.service';

describe('MarginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarginService]
    });
  });

  it('should be created', inject([MarginService], (service: MarginService) => {
    expect(service).toBeTruthy();
  }));
});
