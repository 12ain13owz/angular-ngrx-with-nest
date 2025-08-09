import { Component, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'

import { ThemeService } from './services/themes/theme.service'

@Component({
  imports: [RouterModule, ToastModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [MessageService],
})
export class App {
  private themeService = inject(ThemeService)

  constructor() {
    this.themeService.initializeTheme()
  }
}
