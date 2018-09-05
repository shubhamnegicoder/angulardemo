import { TestBed, inject } from '@angular/core/testing';

import { EditproService } from './editpro.service';

describe('EditproService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditproService]
    });
  });

  it('should be created', inject([EditproService], (service: EditproService) => {
    expect(service).toBeTruthy();
  }));
});
