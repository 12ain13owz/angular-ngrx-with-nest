import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Tasks, TasksResponse } from './tasks.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/tasks`

  getTasks(): Observable<TasksResponse> {
    return this.http.get<TasksResponse>(this.apiUrl)
  }

  addTask(task: Omit<Tasks, '_id'>): Observable<Tasks> {
    return this.http.post<Tasks>(this.apiUrl, task)
  }

  updateTask(task: Partial<Tasks> & { _id: string }): Observable<Tasks> {
    return this.http.patch<Tasks>(`${this.apiUrl}/${task._id}`, task)
  }

  deleteTask(_id: string): Observable<Tasks> {
    return this.http.delete<Tasks>(`${this.apiUrl}/${_id}`)
  }
}
