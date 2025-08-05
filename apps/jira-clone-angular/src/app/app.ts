import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'

@Component({
  imports: [RouterModule, ToastModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [MessageService],
})
export class App {
  protected title = 'jira-clone-angular'
}
