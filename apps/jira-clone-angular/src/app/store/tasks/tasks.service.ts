import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Tasks } from './tasks.model'
import { environment } from '../../../environments/environment'
import { Comment, CommentPayload } from '../comments/comments.model'

@Injectable({ providedIn: 'root' })
export class TasksService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/tasks`

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.apiUrl)
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

  getComments(tasksId: string): Observable<Comment[]> {
    const url = `${this.apiUrl}/${tasksId}/comments`
    return this.http.get<Comment[]>(url)
  }

  addComment(tasksId: string, comment: CommentPayload): Observable<Comment> {
    const url = `${this.apiUrl}/${tasksId}/comments`
    return this.http.post<Comment>(url, comment)
  }

  updateComment(tasksId: string, commentId: string, content: string): Observable<Comment> {
    const url = `${this.apiUrl}/${tasksId}/comments/${commentId}`
    return this.http.patch<Comment>(url, { content })
  }

  deleteComment(tasksId: string, commentId: string): Observable<Comment> {
    const url = `${this.apiUrl}/${tasksId}/comments/${commentId}`
    return this.http.delete<Comment>(url)
  }
}
