import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasetrnmismatchComponent } from './releasetrnmismatch.component';

describe('ReleasetrnmismatchComponent', () => {
  let component: ReleasetrnmismatchComponent;
  let fixture: ComponentFixture<ReleasetrnmismatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasetrnmismatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasetrnmismatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
