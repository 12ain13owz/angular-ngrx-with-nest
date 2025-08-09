import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal(false)

  constructor() {
    this.initializeTheme()
  }

  initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDarkModeState = savedTheme === 'dark' || (savedTheme === null && prefersDark)

    this.isDarkMode.set(initialDarkModeState)
    this.updateThemeClass(initialDarkModeState)
  }

  toggleTheme(): void {
    const newDarkModeState = !this.isDarkMode()
    this.isDarkMode.set(newDarkModeState)
    localStorage.setItem('theme', newDarkModeState ? 'dark' : 'light')
    this.updateThemeClass(newDarkModeState)
  }

  private updateThemeClass(isDark: boolean): void {
    const htmlElement = document.documentElement
    if (!htmlElement) return

    htmlElement.classList.toggle('app-theme', isDark)
  }
}
