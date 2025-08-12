import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCommentForm } from './task-comment-form';

describe('TaskCommentForm', () => {
  let component: TaskCommentForm;
  let fixture: ComponentFixture<TaskCommentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCommentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCommentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
