import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { catchError, map, Observable, of } from 'rxjs'

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
  private user = signal<User | null>(null)
  private accessToken = signal<string | null>(null)

  getUser(): User | null {
    return this.user()
  }

  setUser(user: User | null): void {
    this.user.set(user)
  }

  isAuthenticated(): Observable<boolean> {
    if (this.user()) return of(true)

    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return of(false)
    this.accessToken.set(accessToken)

    return this.loginWithToken(accessToken)
  }

  getAccessToken(): string | null {
    return this.accessToken()
  }

  setAuthDate(user: User, accessToken: string): void {
    this.user.set(user)
    this.accessToken.set(accessToken)
    localStorage.setItem('accessToken', accessToken)
  }

  clearAuthData(): void {
    this.user.set(null)
    this.accessToken.set(null)
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

  private loginWithToken(token: string): Observable<boolean> {
    const url = `${this.apiUrl}/profile`
    return this.http.get<User>(url, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      map(res => {
        this.setUser(res)
        return true
      }),
      catchError(() => {
        this.clearAuthData()
        return of(false)
      })
    )
  }

  register(formValue: RegisterFormValue): Observable<AuthResponse> {
    const payload = this.mapToRegister(formValue)
    const url = `${this.apiUrl}/register`
    return this.http.post<AuthResponse>(url, payload)
  }

  logout(): Observable<void> {
    const url = `${this.apiUrl}/logout`
    return this.http.post<void>(url, {})
  }
}
