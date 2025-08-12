import { AsyncPipe } from '@angular/common'
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { ButtonGroupModule } from 'primeng/buttongroup'
import { CardModule } from 'primeng/card'
import { Dialog } from 'primeng/dialog'
import { DividerModule } from 'primeng/divider'
import { DragDropModule } from 'primeng/dragdrop'
import { MenubarModule } from 'primeng/menubar'
import { map } from 'rxjs'

import { Navigation } from '../../../../services/navigations/navigation.service'
import { ThemeToggle } from '../../../../shared/components/ui/theme-toggle/theme-toggle'
import { FormMode } from '../../../../shared/types/generic'
import { AuthActions } from '../../../../store/auth/auth.actions'
import { selectAuthUser, selectCurrentUser } from '../../../../store/auth/auth.selectors'
import { AuthService } from '../../../../store/auth/auth.service'
import { CommentsActions } from '../../../../store/comments/comments.actions'
import { CommentFormValue, CommentWithAuthName } from '../../../../store/comments/comments.model'
import { selectCommentsWithAuthorDetails } from '../../../../store/comments/comments.selectors'
import { TasksActions } from '../../../../store/tasks/tasks.actions'
import {
  Tasks,
  TasksFormValue,
  TasksPayload,
  TasksStatus,
  TasksWithReporterAndAssignee,
} from '../../../../store/tasks/tasks.model'
import {
  selectTodoTasksWithReporterAndAssignee,
  selectInProgressTasksWithReporterAndAssignee,
  selectDoneTasksWithReporterAndAssignee,
  selectMyTasks,
} from '../../../../store/tasks/tasks.selectors'
import { UserActions } from '../../../../store/users/users.actions'
import { selectAllUsers } from '../../../../store/users/users.selectors'
import { TasksCard } from '../../components/task-card/tasks-card'
import { TaskCommentForm } from '../../components/task-comment-form/task-comment-form'
import { TasksForm } from '../../components/task-form/tasks-form'

@Component({
  selector: 'app-board',
  imports: [
    AsyncPipe,
    MenubarModule,
    ButtonModule,
    ButtonGroupModule,
    DragDropModule,
    CardModule,
    DividerModule,
    TasksCard,
    TasksForm,
    TaskCommentForm,
    ThemeToggle,
    Dialog,
  ],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit {
  private store = inject(Store)
  private actions$ = inject(Actions)
  private destroyRef = inject(DestroyRef)
  private message = inject(MessageService)
  private authService = inject(AuthService)
  private navigation = inject(Navigation)
  private draggedTasks: TasksWithReporterAndAssignee | null = null
  private readonly statusMap: Record<string, TasksStatus> = {
    'To Do': TasksStatus.TODO,
    'In Progress': TasksStatus.IN_PROGRESS,
    Done: TasksStatus.DONE,
  }

  userId$ = this.store.select(selectCurrentUser)
  email$ = this.store.select(selectAuthUser).pipe(map(state => state.email))
  users$ = this.store.select(selectAllUsers)
  todoTasks$ = this.store.select(selectTodoTasksWithReporterAndAssignee)
  inProgressTasks$ = this.store.select(selectInProgressTasksWithReporterAndAssignee)
  doneTasks$ = this.store.select(selectDoneTasksWithReporterAndAssignee)

  myTodoTasks$ = this.store
    .select(selectMyTasks)
    .pipe(map(tasks => tasks.filter(task => task.status === TasksStatus.TODO)))
  myInProgressTasks$ = this.store
    .select(selectMyTasks)
    .pipe(map(tasks => tasks.filter(task => task.status === TasksStatus.IN_PROGRESS)))
  myDoneTasks$ = this.store
    .select(selectMyTasks)
    .pipe(map(tasks => tasks.filter(task => task.status === TasksStatus.DONE)))

  comments$ = this.store.select(selectCommentsWithAuthorDetails)

  filterTasks = signal<'all' | 'my'>('all')
  columns = computed(() => this.getColumns(this.filterTasks()))

  visible = false
  mode: FormMode = 'create'
  tasks: TasksWithReporterAndAssignee | null = null
  userId: string | null = null
  email: string | null = null

  constructor() {
    this.userId$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(userId => (this.userId = userId))
    this.email$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(email => (this.email = email))
    this.initializeTaskSuccessListener()
    this.initializeTaskFailureListener()
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers())
    this.store.dispatch(TasksActions.loadTasks())
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout())
  }

  onDrop(_: DragEvent, column: string): void {
    if (!this.draggedTasks) return

    const newStatus = this.statusMap[column]
    if (!newStatus) return
    if (this.draggedTasks.status === newStatus) return

    const payload: Tasks = { ...this.draggedTasks, status: newStatus }
    this.store.dispatch(TasksActions.updateTasks({ tasks: payload }))
  }

  dragStart(tasks: TasksWithReporterAndAssignee): void {
    this.draggedTasks = tasks
  }

  dragEnd(): void {
    this.draggedTasks = null
  }

  onCreateTasksForm(): void {
    this.visible = true
    this.mode = 'create'
    this.tasks = null
  }

  onEditTasksForm(tasks: TasksWithReporterAndAssignee): void {
    this.visible = true
    this.mode = 'update'
    this.tasks = tasks

    this.store.dispatch(CommentsActions.loadComments({ taskId: this.tasks._id }))
  }

  onDeleteTasks(tasks: TasksWithReporterAndAssignee): void {
    this.store.dispatch(TasksActions.deleteTasks({ _id: tasks._id }))
  }

  onCloseTasksForm(): void {
    this.visible = false
  }

  setFilterTasks(filter: 'all' | 'my'): void {
    this.filterTasks.set(filter)
  }

  onTasksFormSubmit(tasks: TasksFormValue): void {
    const userId = this.validateUserId()

    if (this.mode === 'create') {
      const payload: TasksPayload = {
        title: tasks.title as string,
        description: tasks.description || '',
        status: tasks.status as TasksStatus,
        assigneeId: tasks.assigneeId ?? null,
        reporterId: userId as string,
      }
      this.store.dispatch(TasksActions.addTasks({ tasks: payload }))
    }

    if (this.mode === 'update') {
      const tasksId = this.tasks?._id
      if (!tasksId) return

      const reporterId = this.tasks?.reporterId || userId
      const payload: Tasks = {
        _id: tasksId,
        title: tasks.title as string,
        description: tasks.description || '',
        status: tasks.status as TasksStatus,
        assigneeId: tasks.assigneeId ?? null,
        reporterId: reporterId as string,
      }

      this.store.dispatch(TasksActions.updateTasks({ tasks: payload }))
    }
  }

  onCommentFormSubmit(comment: CommentFormValue): void {
    const taskId = this.validateTaskId()
    this.store.dispatch(
      CommentsActions.addComment({ taskId: taskId as string, content: comment.content || '' })
    )
  }

  onEditCommentForm(comment: CommentWithAuthName): void {
    this.store.dispatch(
      CommentsActions.updateComment({
        taskId: comment.taskId,
        commentId: comment._id,
        content: comment.content,
      })
    )
  }

  onDeleteComment(comment: CommentWithAuthName): void {
    this.store.dispatch(
      CommentsActions.deleteComment({ taskId: comment.taskId, commentId: comment._id })
    )
  }

  private initializeTaskSuccessListener(): void {
    this.actions$
      .pipe(
        ofType(
          TasksActions.addTasksSuccess,
          TasksActions.updateTasksSuccess,
          TasksActions.deleteTasksSuccess
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(action => this.handleTaskSuccess(action))
  }

  private initializeTaskFailureListener(): void {
    this.actions$
      .pipe(
        ofType(
          TasksActions.addTasksFailure,
          TasksActions.updateTasksFailure,
          TasksActions.deleteTasksFailure
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(action => this.handleTaskError(action))
  }

  private handleTaskSuccess(action: { type: string }): void {
    const messageMap: { [key: string]: string } = {
      [TasksActions.addTasksSuccess.type]: 'Task added successfully',
      [TasksActions.updateTasksSuccess.type]: 'Task updated successfully',
      [TasksActions.deleteTasksSuccess.type]: 'Task deleted successfully',
    }

    this.showMessage('success', 'Success', messageMap[action.type])
    this.visible = false
  }

  private handleTaskError(action: { error: string }): void {
    this.showMessage('error', 'Error', action.error || 'Something went wrong')
  }

  private showMessage(severity: string, summary: string, detail: string) {
    this.message.add({ severity, summary, detail })
  }

  private validateUserId(): string | void {
    const userId = this.userId
    if (!userId) {
      this.authService.logout()
      this.navigation.goToLogin()
      return
    }

    return userId as string
  }

  private validateTaskId(): string | void {
    const taskId = this.tasks?._id
    if (!taskId) {
      this.showMessage('error', 'Error', 'Task not found')
      return
    }

    return taskId as string
  }

  private getColumns(filter: 'all' | 'my') {
    return [
      {
        title: 'To Do',
        tasks: filter === 'all' ? this.todoTasks$ : this.myTodoTasks$,
      },
      {
        title: 'In Progress',
        tasks: filter === 'all' ? this.inProgressTasks$ : this.myInProgressTasks$,
      },
      {
        title: 'Done',
        tasks: filter === 'all' ? this.doneTasks$ : this.myDoneTasks$,
      },
    ]
  }
}
