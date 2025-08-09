import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Task } from './tasks.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/tasks`

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }

  addTask(task: Omit<Task, '_id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task)
  }

  updateTask(task: Partial<Task> & { _id: string }): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${task._id}`, task)
  }

  deleteTask(_id: string): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${_id}`)
  }
}
