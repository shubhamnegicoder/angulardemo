import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittrnComponent } from './edittrn.component';

describe('EdittrnComponent', () => {
  let component: EdittrnComponent;
  let fixture: ComponentFixture<EdittrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
