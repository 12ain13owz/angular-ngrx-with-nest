import { FormControl, FormGroup } from '@angular/forms'

export enum TasksStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Tasks {
  _id: string
  title: string
  description: string
  status: TasksStatus
  reporterId: string
  assigneeId?: string | null
}

export interface TasksState {
  tasks: Tasks[]
  isLoading: boolean
  error: string | null
}

export interface TasksResponse {
  tasks: Tasks[]
  count: number
}

export interface TasksFormControl {
  title: FormControl<string>
  description: FormControl<string>
  status: FormControl<TasksStatus>
  assigneeId: FormControl<string | null>
}

export type TasksFormValue = FormGroup<TasksFormControl>['value']
export type TasksPayload = Required<TasksFormValue> & { reporterId: string }
