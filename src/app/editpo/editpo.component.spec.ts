import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpoComponent } from './editpo.component';

describe('EditpoComponent', () => {
  let component: EditpoComponent;
  let fixture: ComponentFixture<EditpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
