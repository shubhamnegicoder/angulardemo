import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterVndorComponent } from './master-vndor.component';

describe('MasterVndorComponent', () => {
  let component: MasterVndorComponent;
  let fixture: ComponentFixture<MasterVndorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterVndorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterVndorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
