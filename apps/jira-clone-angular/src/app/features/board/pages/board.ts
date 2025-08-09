import { AsyncPipe } from '@angular/common'
import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { DividerModule } from 'primeng/divider'
import { DragDropModule } from 'primeng/dragdrop'
import { MenubarModule } from 'primeng/menubar'
import { map } from 'rxjs'

import { ThemeToggle } from '../../../shared/components/ui/theme-toggle/theme-toggle'
import { AuthActions } from '../../../store/auth/auth.actions'
import { selectUser } from '../../../store/auth/auth.selectors'
import { TasksActions } from '../../../store/tasks/tasks.actions'
import {
  selectDoneTasks,
  selectInProgressTasks,
  selectTodoTasks,
} from '../../../store/tasks/tasks.selectors'
import { TaskCard } from '../components/task-card/task-card'

@Component({
  selector: 'app-board',
  imports: [
    AsyncPipe,
    MenubarModule,
    ButtonModule,
    DragDropModule,
    CardModule,
    DividerModule,
    TaskCard,
    ThemeToggle,
  ],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit {
  private store = inject(Store)
  private actions$ = inject(Actions)
  private destroyRef = inject(DestroyRef)
  private message = inject(MessageService)

  email$ = this.store.select(selectUser).pipe(map(state => state.email))
  todoTasks$ = this.store.select(selectTodoTasks)
  inProgressTasks$ = this.store.select(selectInProgressTasks)
  doneTasks$ = this.store.select(selectDoneTasks)

  columns = [
    { title: 'To Do', tasks: this.todoTasks$ },
    { title: 'In Progress', tasks: this.inProgressTasks$ },
    { title: 'Done', tasks: this.doneTasks$ },
  ]

  constructor() {
    this.initializeTaskSuccessListener()
    this.initializeTaskFailureListener()
  }

  ngOnInit(): void {
    this.store.dispatch(TasksActions.loadTasks())
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout())
  }

  onDrop(event: any): void {
    console.log(event)
  }

  dragStart(event: any): void {
    console.log(event)
  }

  dragEnd(event: any): void {
    console.log(event)
  }

  private initializeTaskSuccessListener(): void {
    this.actions$
      .pipe(
        ofType(
          TasksActions.addTaskSuccess,
          TasksActions.updateTaskSuccess,
          TasksActions.deleteTaskSuccess
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(action => this.handleTaskSuccess(action))
  }

  private initializeTaskFailureListener(): void {
    this.actions$
      .pipe(
        ofType(
          TasksActions.addTaskFailure,
          TasksActions.updateTaskFailure,
          TasksActions.deleteTaskFailure
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(action => this.handleTaskError(action))
  }

  private handleTaskSuccess(action: { type: string }): void {
    const messageMap: { [key: string]: string } = {
      [TasksActions.addTaskSuccess.type]: 'Task added successfully',
      [TasksActions.updateTaskSuccess.type]: 'Task updated successfully',
      [TasksActions.deleteTaskSuccess.type]: 'Task deleted successfully',
    }

    this.showMessage('success', 'Success', messageMap[action.type])
  }

  private handleTaskError(action: { error: string }): void {
    this.showMessage('error', 'Error', action.error || 'Something went wrong')
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.message.add({ severity, summary, detail })
  }
}
