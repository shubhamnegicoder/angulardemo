import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstockadjustmentComponent } from './addstockadjustment.component';

describe('AddstockadjustmentComponent', () => {
  let component: AddstockadjustmentComponent;
  let fixture: ComponentFixture<AddstockadjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstockadjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstockadjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
