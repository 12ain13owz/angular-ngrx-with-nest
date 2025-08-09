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
  on(TasksActions.addTask, state => ({
    ...state,
    tasks: [...state.tasks],
    isLoading: true,
  })),
  on(TasksActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    isLoading: false,
    error: null,
  })),
  on(TasksActions.updateTask, state => ({
    ...state,
    tasks: [...state.tasks],
    isLoading: true,
  })),
  on(TasksActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t._id === task._id ? { ...t, ...task } : t)),
    isLoading: false,
    error: null,
  })),
  on(TasksActions.deleteTask, state => ({
    ...state,
    tasks: [...state.tasks],
    isLoading: true,
  })),
  on(TasksActions.deleteTaskSuccess, (state, { _id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t._id !== _id),
    isLoading: false,
    error: null,
  })),
  on(
    TasksActions.loadTasksFailure,
    TasksActions.addTaskFailure,
    TasksActions.updateTaskFailure,
    TasksActions.deleteTaskFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })
  )
)
