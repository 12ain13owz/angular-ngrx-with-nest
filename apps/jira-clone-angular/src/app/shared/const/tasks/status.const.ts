import { TasksStatus } from '../../../store/tasks/tasks.model'

export const tasksStatusOptions = [
  { label: 'To Do', value: TasksStatus.TODO },
  { label: 'In Progress', value: TasksStatus.IN_PROGRESS },
  { label: 'Done', value: TasksStatus.DONE },
]
