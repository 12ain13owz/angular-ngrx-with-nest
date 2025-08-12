import { DatePipe } from '@angular/common'
import { Component, effect, inject, input, output, signal } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ConfirmationService } from 'primeng/api'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { ConfirmPopupModule } from 'primeng/confirmpopup'

import { TextArea } from '../../../../shared/components/forms/text-area/text-area'
import { CommentFormControl, CommentWithAuthName } from '../../../../store/comments/comments.model'

@Component({
  selector: 'app-comment-list',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    AvatarModule,
    ConfirmPopupModule,
    DatePipe,
    TextArea,
  ],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.scss',
  providers: [ConfirmationService],
})
export class CommentList {
  private fb = inject(FormBuilder)
  private confirmationService = inject(ConfirmationService)

  comment = input<CommentWithAuthName | null>(null)
  isEdit = signal<boolean>(false)

  commentForm: FormGroup<CommentFormControl>
  saveClicked = output<CommentWithAuthName>()
  deleteClicked = output<CommentWithAuthName>()

  constructor() {
    this.commentForm = this.fb.nonNullable.group({
      content: [''],
    })

    effect(() => {
      if (!this.comment()) return
      this.commentForm.patchValue({ content: this.comment()?.content })
    })
  }

  onEdit(): void {
    this.isEdit.set(true)
  }

  onCancel(): void {
    this.isEdit.set(false)
  }

  onSave(): void {
    const payload = {
      ...(this.comment() as CommentWithAuthName),
      content: this.commentForm.controls.content.value,
    }
    this.isEdit.set(false)
    this.saveClicked.emit(payload)
  }

  onConfirmDelete(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this comment?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => this.onDelete(),
    })
  }

  onDelete(): void {
    this.deleteClicked.emit(this.comment() as CommentWithAuthName)
  }
}
