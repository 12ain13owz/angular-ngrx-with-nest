import { Component, input } from '@angular/core'

import { Task } from '../../../../store/tasks/tasks.model'

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  task = input.required<Task>()
}
