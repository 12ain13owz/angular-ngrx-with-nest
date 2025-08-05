import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs'
import { AuthFormPayload, AuthFormValue, AuthResponse, User } from './auth.model'

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

  isAuthenticated(): boolean {
    return !!this.user()
  }

  getAccessToken(): string | null {
    return this.accessToken()
  }

  setAuthDate(user: User, accessToken: string): void {
    this.user.set(user)
    this.accessToken.set(accessToken)
  }

  clearAuth(): void {
    this.user.set(null)
    this.accessToken.set(null)
  }

  private mapToPayload(formValue: AuthFormValue): AuthFormPayload {
    return { email: formValue.email as string, password: formValue.password as string }
  }

  login(formValue: AuthFormValue): Observable<AuthResponse> {
    const payload = this.mapToPayload(formValue)
    const url = `${this.apiUrl}/login`
    return this.http.post<AuthResponse>(url, payload)
  }

  register(formValue: AuthFormValue): Observable<AuthResponse> {
    const payload = this.mapToPayload(formValue)
    const url = `${this.apiUrl}/register`
    return this.http.post<AuthResponse>(url, payload)
  }

  logout(): Observable<void> {
    const url = `${this.apiUrl}/logout`
    return this.http.post<void>(url, {})
  }
}
