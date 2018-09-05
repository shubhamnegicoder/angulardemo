import { TestBed, inject } from '@angular/core/testing';

import { TransferReceiptNoteService } from './transfer-receipt-note.service';

describe('TransferReceiptNoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferReceiptNoteService]
    });
  });

  it('should be created', inject([TransferReceiptNoteService], (service: TransferReceiptNoteService) => {
    expect(service).toBeTruthy();
  }));
});
