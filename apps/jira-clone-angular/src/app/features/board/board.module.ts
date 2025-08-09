import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { routes } from './board.routes'

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class BoardModule {}
