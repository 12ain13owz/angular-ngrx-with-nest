import { CommonModule } from '@angular/common'
import { Component, input, output } from '@angular/core'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { DividerModule } from 'primeng/divider'
import { MessageModule } from 'primeng/message'
import { TagModule } from 'primeng/tag'
import { TooltipModule } from 'primeng/tooltip'

import { TasksStatus, TasksWithReporterAndAssignee } from '../../../../store/tasks/tasks.model'
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
  tasks = input.required<TasksWithReporterAndAssignee>()
  editClicked = output<TasksWithReporterAndAssignee>()

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
