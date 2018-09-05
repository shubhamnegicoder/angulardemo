import { TestBed, inject } from '@angular/core/testing';

import { CreatePRService } from './create-pr.service';

describe('CreatePRService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePRService]
    });
  });

  it('should be created', inject([CreatePRService], (service: CreatePRService) => {
    expect(service).toBeTruthy();
  }));
});
