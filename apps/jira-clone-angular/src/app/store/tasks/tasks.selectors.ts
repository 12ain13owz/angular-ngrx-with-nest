import { createFeatureSelector, createSelector } from '@ngrx/store'

import { tasksKey } from './tasks.const'
import { Tasks, TasksState, TasksStatus } from './tasks.model'

export const selectTasksState = createFeatureSelector<TasksState>(tasksKey)
export const selectAllTasks = createSelector(selectTasksState, (state: TasksState) => state.tasks)
export const selectTodoTasks = createSelector(selectAllTasks, (tasks: Tasks[]) =>
  tasks.filter(task => task.status === TasksStatus.TODO)
)
export const selectInProgressTasks = createSelector(selectAllTasks, (tasks: Tasks[]) =>
  tasks.filter(task => task.status === TasksStatus.IN_PROGRESS)
)
export const selectDoneTasks = createSelector(selectAllTasks, (tasks: Tasks[]) =>
  tasks.filter(task => task.status === TasksStatus.DONE)
)
