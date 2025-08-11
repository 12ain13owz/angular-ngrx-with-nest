import { Component, computed, effect, inject, input, output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ConfirmationService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { ConfirmPopupModule } from 'primeng/confirmpopup'

import { Input } from '../../../../shared/components/forms/input/input'
import { Select } from '../../../../shared/components/forms/select/select'
import { TextArea } from '../../../../shared/components/forms/text-area/text-area'
import { tasksStatusOptions } from '../../../../shared/const/tasks/status.const'
import { validationMessages } from '../../../../shared/const/validations/validation.const'
import { FormMarkAllAsTouched } from '../../../../shared/directives/form/form.directive'
import { FormMode } from '../../../../shared/types/generic'
import {
  Tasks,
  TasksFormControl,
  TasksFormValue,
  TasksStatus,
  TasksWithReporterAndAssignee,
} from '../../../../store/tasks/tasks.model'
import { User } from '../../../../store/users/users.model'

@Component({
  selector: 'app-tasks-form',
  imports: [
    ReactiveFormsModule,
    FormMarkAllAsTouched,
    ButtonModule,
    ConfirmPopupModule,
    Input,
    TextArea,
    Select,
  ],
  templateUrl: './tasks-form.html',
  styleUrl: './tasks-form.scss',
  providers: [ConfirmationService],
})
export class TasksForm {
  private fb = inject(FormBuilder)
  private confirmationService = inject(ConfirmationService)

  mode = input<FormMode>('create')
  tasks = input<TasksWithReporterAndAssignee | null>(null)
  users = input<User[] | null>([])
  userOptions = computed(() => this.users()?.map(user => ({ label: user.name, value: user._id })))
  statusOptions = tasksStatusOptions

  formSubmit = output<TasksFormValue>()
  cancelClicked = output<void>()
  deleteClicked = output<Tasks>()

  tasksForm: FormGroup<TasksFormControl>
  validateMessage = validationMessages

  constructor() {
    this.tasksForm = this.fb.nonNullable.group({
      title: ['', [Validators.required]],
      description: [''],
      status: [TasksStatus.TODO, [Validators.required]],
      assigneeId: this.fb.control<string | null>(null),
    })

    effect(() => {
      if (this.mode() === 'create') return
      if (!this.tasks()) return

      this.patchWithFormData(this.tasks() as Tasks)
    })
  }

  private patchWithFormData(data: TasksWithReporterAndAssignee) {
    this.tasksForm.patchValue(data)
  }

  onSubmit(): void {
    if (this.tasksForm.invalid) return
    this.formSubmit.emit(this.tasksForm.value)
  }

  onCancel(): void {
    this.cancelClicked.emit()
  }

  onConfirmDelete(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
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
      accept: () => this.onDeleteTasks(),
    })
  }

  onDeleteTasks(): void {
    if (!this.tasks()) return
    this.deleteClicked.emit(this.tasks() as TasksWithReporterAndAssignee)
  }
}
