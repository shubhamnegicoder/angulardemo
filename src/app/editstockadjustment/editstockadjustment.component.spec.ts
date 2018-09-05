import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstockadjustmentComponent } from './editstockadjustment.component';

describe('EditstockadjustmentComponent', () => {
  let component: EditstockadjustmentComponent;
  let fixture: ComponentFixture<EditstockadjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditstockadjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditstockadjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
