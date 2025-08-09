import { Component, computed, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { ToggleSwitchModule } from 'primeng/toggleswitch'

import { ThemeService } from '../../../../services/themes/theme.service'

@Component({
  selector: 'app-theme-toggle',
  imports: [FormsModule, ToggleSwitchModule, ButtonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private themeService = inject(ThemeService)
  isDarkMode = computed(() => this.themeService.isDarkMode())

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }
}
