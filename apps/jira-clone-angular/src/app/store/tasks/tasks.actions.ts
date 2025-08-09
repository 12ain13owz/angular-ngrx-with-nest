import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { Task } from './tasks.model'

export const TasksActions = createActionGroup({
  source: 'Tasks',
  events: {
    LoadTasks: emptyProps(),
    LoadTasksSuccess: props<{ tasks: Task[] }>(),
    LoadTasksFailure: props<{ error: string }>(),

    AddTask: props<{ task: Omit<Task, '_id'> }>(),
    AddTaskSuccess: props<{ task: Task }>(),
    AddTaskFailure: props<{ error: string }>(),

    UpdateTask: props<{ task: Partial<Task> & { _id: string } }>(),
    UpdateTaskSuccess: props<{ task: Partial<Task> & { _id: string } }>(),
    UpdateTaskFailure: props<{ error: string }>(),

    DeleteTask: props<{ _id: string }>(),
    DeleteTaskSuccess: props<{ _id: string }>(),
    DeleteTaskFailure: props<{ error: string }>(),
  },
})
