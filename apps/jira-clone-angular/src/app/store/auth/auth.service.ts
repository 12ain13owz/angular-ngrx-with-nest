import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { catchError, map, Observable, of } from 'rxjs'

import { AuthFormPayload, AuthFormValue, AuthResponse, User } from './auth.model'
import { environment } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient)

  private apiUrl = `${environment.apiUrl}`
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

  private mapToPayload(formValue: AuthFormValue): AuthFormPayload {
    return { email: formValue.email as string, password: formValue.password as string }
  }

  login(formValue: AuthFormValue): Observable<AuthResponse> {
    const payload = this.mapToPayload(formValue)
    const url = `${this.apiUrl}/auth/login`
    return this.http.post<AuthResponse>(url, payload)
  }

  private loginWithToken(token: string): Observable<boolean> {
    const url = `${this.apiUrl}/user/profile`
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

  register(formValue: AuthFormValue): Observable<AuthResponse> {
    const payload = this.mapToPayload(formValue)
    const url = `${this.apiUrl}/user/register`
    return this.http.post<AuthResponse>(url, payload)
  }

  logout(): Observable<void> {
    const url = `${this.apiUrl}/auth/logout`
    return this.http.post<void>(url, {})
  }
}
