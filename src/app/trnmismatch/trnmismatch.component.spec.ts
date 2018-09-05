import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnmismatchComponent } from './trnmismatch.component';

describe('TrnmismatchComponent', () => {
  let component: TrnmismatchComponent;
  let fixture: ComponentFixture<TrnmismatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnmismatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnmismatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
