import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToComponent } from './edit-to.component';

describe('EditToComponent', () => {
  let component: EditToComponent;
  let fixture: ComponentFixture<EditToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
