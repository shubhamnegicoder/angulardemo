import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToComponent } from './create-to.component';

describe('CreateToComponent', () => {
  let component: CreateToComponent;
  let fixture: ComponentFixture<CreateToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
