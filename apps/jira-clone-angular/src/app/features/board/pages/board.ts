import { AsyncPipe } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
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

  email$ = this.store.select(selectUser).pipe(map(state => state.email))
  todoTasks$ = this.store.select(selectTodoTasks)
  inProgressTasks$ = this.store.select(selectInProgressTasks)
  doneTasks$ = this.store.select(selectDoneTasks)

  ngOnInit(): void {
    this.store.dispatch(TasksActions.loadTasks())
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout())
  }

  onDrop(event: any) {
    console.log(event)
  }

  dragStart(event: any) {
    console.log(event)
  }

  dragEnd(event: any) {
    console.log(event)
  }
}
