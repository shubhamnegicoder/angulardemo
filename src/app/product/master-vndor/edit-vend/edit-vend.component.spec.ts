import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVendComponent } from './edit-vend.component';

describe('EditVendComponent', () => {
  let component: EditVendComponent;
  let fixture: ComponentFixture<EditVendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
