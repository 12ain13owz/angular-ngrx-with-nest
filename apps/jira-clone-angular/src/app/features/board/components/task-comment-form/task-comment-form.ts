import { Component, effect, inject, input, output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DividerModule } from 'primeng/divider'

import { TextArea } from '../../../../shared/components/forms/text-area/text-area'
import { FormMode } from '../../../../shared/types/generic'
import {
  CommentFormControl,
  CommentFormValue,
  CommentWithAuthName,
} from '../../../../store/comments/comments.model'
import { CommentList } from '../comment-list/comment-list'

@Component({
  selector: 'app-task-comment-form',
  imports: [ReactiveFormsModule, ButtonModule, DividerModule, TextArea, CommentList],
  templateUrl: './task-comment-form.html',
  styleUrl: './task-comment-form.scss',
})
export class TaskCommentForm {
  private fb = inject(FormBuilder)

  mode = input<FormMode>('create')
  comment = input<CommentWithAuthName | null>(null)
  comments = input<CommentWithAuthName[] | null>([])
  formSubmit = output<CommentFormValue>()
  editClicked = output<CommentWithAuthName>()
  deleteClicked = output<CommentWithAuthName>()

  commentForm: FormGroup<CommentFormControl>

  constructor() {
    this.commentForm = this.fb.nonNullable.group({
      content: [''],
    })

    effect(() => {
      if (this.mode() === 'create') return
      if (!this.comment()) return

      this.patchWithFormData(this.comment() as CommentWithAuthName)
    })
  }

  private patchWithFormData(data: CommentWithAuthName) {
    this.commentForm.patchValue(data)
  }

  onSubmit(): void {
    if (this.commentForm.invalid) return
    this.formSubmit.emit(this.commentForm.value)
    this.commentForm.reset()
  }

  onEdit(comment: CommentWithAuthName) {
    this.editClicked.emit(comment)
  }

  onDelete(comment: CommentWithAuthName) {
    this.deleteClicked.emit(comment)
  }
}
