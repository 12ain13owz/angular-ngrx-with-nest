import { createFeatureSelector, createSelector } from '@ngrx/store'

import { tasksKey } from './tasks.const'
import { Tasks, TasksState, TasksStatus, TasksWithReporterAndAssignee } from './tasks.model'
import { selectCurrentUser } from '../auth/auth.selectors'
import { selectAllUsers } from '../users/users.selectors'

export const selectTasksState = createFeatureSelector<TasksState>(tasksKey)
export const selectAllTasks = createSelector(selectTasksState, (state: TasksState) => state.tasks)
export const selectTasksWithReporterAndAssigneeInfo = createSelector(
  selectAllTasks,
  selectAllUsers,
  (tasks, users): TasksWithReporterAndAssignee[] => {
    const usersMap = new Map(users.map(user => [user._id, user.name]))
    return tasks.map(task => ({
      ...task,
      assigneeName: task.assigneeId ? usersMap.get(task.assigneeId) : null,
      reporterName: usersMap.get(task.reporterId),
    }))
  }
)

export const selectTodoTasksWithReporterAndAssignee = createSelector(
  selectTasksWithReporterAndAssigneeInfo,
  (tasks: Tasks[]): TasksWithReporterAndAssignee[] =>
    tasks.filter(task => task.status === TasksStatus.TODO)
)
export const selectInProgressTasksWithReporterAndAssignee = createSelector(
  selectTasksWithReporterAndAssigneeInfo,
  (tasks: Tasks[]): TasksWithReporterAndAssignee[] =>
    tasks.filter(task => task.status === TasksStatus.IN_PROGRESS)
)
export const selectDoneTasksWithReporterAndAssignee = createSelector(
  selectTasksWithReporterAndAssigneeInfo,
  (tasks: Tasks[]): TasksWithReporterAndAssignee[] =>
    tasks.filter(task => task.status === TasksStatus.DONE)
)

export const selectMyTasks = createSelector(
  selectTasksWithReporterAndAssigneeInfo,
  selectCurrentUser,
  (tasks, currentUserId): TasksWithReporterAndAssignee[] =>
    currentUserId ? tasks.filter(tasks => tasks.assigneeId === currentUserId) : []
)
