import { FormControl, FormGroup } from '@angular/forms'

export interface Comment {
  _id: string
  taskId: string
  authorId: string
  authorEmail: string
  content: string
  createdAt: Date
}

export interface CommentWithAuthName extends Comment {
  authorName?: string
}

export interface CommentState {
  comments: Comment[]
  isLoading: boolean
  error: string | null
}

export interface CommentFormControl {
  content: FormControl<string>
}

export type CommentFormValue = FormGroup<CommentFormControl>['value']
export type CommentPayload = Required<CommentFormValue> & { authorId: string; authorEmail: string }
