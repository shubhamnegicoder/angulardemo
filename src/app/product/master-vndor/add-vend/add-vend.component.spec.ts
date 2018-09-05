import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendComponent } from './add-vend.component';

describe('AddVendComponent', () => {
  let component: AddVendComponent;
  let fixture: ComponentFixture<AddVendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
