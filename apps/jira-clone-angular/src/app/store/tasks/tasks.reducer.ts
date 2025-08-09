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
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
)
