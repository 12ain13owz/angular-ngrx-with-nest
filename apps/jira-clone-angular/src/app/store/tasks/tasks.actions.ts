import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { Tasks } from './tasks.model'

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    LoadTasks: emptyProps(),
    LoadTasksSuccess: props<{ tasks: Tasks[] }>(),
    LoadTasksFailure: props<{ error: string }>(),

    AddTasks: props<{ tasks: Omit<Tasks, '_id'> }>(),
    AddTasksSuccess: props<{ tasks: Tasks }>(),
    AddTasksFailure: props<{ error: string }>(),

    UpdateTasks: props<{ tasks: Partial<Tasks> & { _id: string } }>(),
    UpdateTasksSuccess: props<{ tasks: Partial<Tasks> & { _id: string } }>(),
    UpdateTasksFailure: props<{ error: string }>(),

    DeleteTasks: props<{ _id: string }>(),
    DeleteTasksSuccess: props<{ _id: string }>(),
    DeleteTasksFailure: props<{ error: string }>(),
  },
})
