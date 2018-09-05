import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportproductmarginComponent } from './importproductmargin.component';

describe('ImportproductmarginComponent', () => {
  let component: ImportproductmarginComponent;
  let fixture: ComponentFixture<ImportproductmarginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportproductmarginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportproductmarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
