import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuItem } from 'primeng/api'
import { Menubar } from 'primeng/menubar'

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, Menubar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  title = 'Ngrx Jira Clone'
  items: MenuItem[] | undefined

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
    ]
  }
}
