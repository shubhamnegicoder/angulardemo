import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainStockComponent } from './maintain-stock.component';

describe('MaintainStockComponent', () => {
  let component: MaintainStockComponent;
  let fixture: ComponentFixture<MaintainStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
