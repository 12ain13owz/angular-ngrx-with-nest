import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { User } from './users.model'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/users`

  getUsers(): Observable<User[]> {
    console.log('Fetching users from API...')
    return this.http.get<User[]>(this.apiUrl)
  }
}
