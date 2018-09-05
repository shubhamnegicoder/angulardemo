import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderPoComponent } from './reorder-po.component';

describe('ReorderPoComponent', () => {
  let component: ReorderPoComponent;
  let fixture: ComponentFixture<ReorderPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorderPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
