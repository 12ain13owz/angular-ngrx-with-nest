import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { routes } from './auth.routes'

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthModule {}
