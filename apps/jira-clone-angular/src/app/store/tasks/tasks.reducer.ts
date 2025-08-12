import { createReducer, on } from '@ngrx/store'

import { TasksActions } from './tasks.actions'
import { TasksState } from './tasks.model'

export const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
}

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, state => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    isLoading: false,
    error: null,
  })),
  on(TasksActions.addTasks, TasksActions.updateTasks, TasksActions.deleteTasks, state => ({
    ...state,
    tasks: [...state.tasks],
    isLoading: true,
  })),
  on(TasksActions.addTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: [...state.tasks, tasks],
    isLoading: false,
    error: null,
  })),
  on(TasksActions.updateTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: state.tasks.map(t => (t._id === tasks._id ? { ...t, ...tasks } : t)),
    isLoading: false,
    error: null,
  })),
  on(TasksActions.deleteTasksSuccess, (state, { _id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t._id !== _id),
    isLoading: false,
    error: null,
  })),
  on(
    TasksActions.loadTasksFailure,
    TasksActions.addTasksFailure,
    TasksActions.updateTasksFailure,
    TasksActions.deleteTasksFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })
  )
)
