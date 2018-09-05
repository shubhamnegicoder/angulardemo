import { TestBed, inject } from '@angular/core/testing';

import { EditpoService } from './editpo.service';

describe('EditpoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditpoService]
    });
  });

  it('should be created', inject([EditpoService], (service: EditpoService) => {
    expect(service).toBeTruthy();
  }));
});
