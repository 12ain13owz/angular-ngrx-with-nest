import { CommonModule } from '@angular/common'
import { Component, computed, input, output } from '@angular/core'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { DividerModule } from 'primeng/divider'
import { MessageModule } from 'primeng/message'
import { TagModule } from 'primeng/tag'
import { TooltipModule } from 'primeng/tooltip'

import { Tasks, TasksStatus } from '../../../../store/tasks/tasks.model'
import { User } from '../../../../store/users/users.model'
@Component({
  selector: 'app-tasks-card',
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DividerModule,
    AvatarModule,
    TagModule,
    TooltipModule,
    MessageModule,
  ],
  templateUrl: './tasks-card.html',
  styleUrl: './tasks-card.scss',
})
export class TasksCard {
  tasks = input.required<Tasks>()
  users = input<User[] | null>(null)

  editClicked = output<Tasks>()

  reporter = computed(() => this.users()?.find(user => user._id === this.tasks().reporterId))
  assignee = computed(() => this.users()?.find(user => user._id === this.tasks().assigneeId))

  getTagSeverity(): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (this.tasks().status) {
      case TasksStatus.TODO:
        return 'info'
      case TasksStatus.IN_PROGRESS:
        return 'warn'
      case TasksStatus.DONE:
        return 'success'
      default:
        return 'secondary'
    }
  }

  onEditTasks(): void {
    this.editClicked.emit(this.tasks())
  }
}
