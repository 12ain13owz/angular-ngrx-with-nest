import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorField } from './error-field';

describe('ErrorField', () => {
  let component: ErrorField;
  let fixture: ComponentFixture<ErrorField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
