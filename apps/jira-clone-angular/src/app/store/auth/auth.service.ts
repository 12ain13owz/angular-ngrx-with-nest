import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { finalize, Observable } from 'rxjs'

import {
  LoginFormPayload,
  LoginFormValue,
  AuthResponse,
  RegisterFormValue,
  RegisterFormPayload,
} from './auth.model'
import { environment } from '../../../environments/environment'
import { User } from '../users/users.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/auth`

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  }

  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token)
  }

  removeAccessToken(): void {
    localStorage.removeItem('accessToken')
  }

  private mapToLogin(formValue: LoginFormValue): LoginFormPayload {
    return { email: formValue.email as string, password: formValue.password as string }
  }

  private mapToRegister(formValue: RegisterFormValue): RegisterFormPayload {
    return {
      email: formValue.email as string,
      password: formValue.password as string,
      name: formValue.name as string,
    }
  }

  login(formValue: LoginFormValue): Observable<AuthResponse> {
    const payload = this.mapToLogin(formValue)
    const url = `${this.apiUrl}/login`
    return this.http.post<AuthResponse>(url, payload)
  }

  loginWithToken(token: string): Observable<User> {
    const url = `${this.apiUrl}/profile`
    return this.http.get<User>(url, { headers: { Authorization: `Bearer ${token}` } })
  }

  register(formValue: RegisterFormValue): Observable<AuthResponse> {
    const payload = this.mapToRegister(formValue)
    const url = `${this.apiUrl}/register`
    return this.http.post<AuthResponse>(url, payload)
  }

  logout(): Observable<void> {
    const url = `${this.apiUrl}/logout`
    return this.http.post<void>(url, {}).pipe(finalize(() => this.removeAccessToken()))
  }
}
