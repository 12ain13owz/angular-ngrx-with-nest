import { createFeatureSelector, createSelector } from '@ngrx/store'

import { tasksKey } from './tasks.const'
import { Task, TasksState, TaskStatus } from './tasks.model'

export const selectTasksState = createFeatureSelector<TasksState>(tasksKey)
export const selectAllTasks = createSelector(selectTasksState, (state: TasksState) => state.tasks)
export const selectTodoTasks = createSelector(selectAllTasks, (tasks: Task[]) =>
  tasks.filter(task => task.status === TaskStatus.TODO)
)
export const selectInProgressTasks = createSelector(selectAllTasks, (tasks: Task[]) =>
  tasks.filter(task => task.status === TaskStatus.IN_PROGRESS)
)
export const selectDoneTasks = createSelector(selectAllTasks, (tasks: Task[]) =>
  tasks.filter(task => task.status === TaskStatus.DONE)
)
