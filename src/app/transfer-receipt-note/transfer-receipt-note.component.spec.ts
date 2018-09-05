import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferReceiptNoteComponent } from './transfer-receipt-note.component';

describe('TransferReceiptNoteComponent', () => {
  let component: TransferReceiptNoteComponent;
  let fixture: ComponentFixture<TransferReceiptNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferReceiptNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferReceiptNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
