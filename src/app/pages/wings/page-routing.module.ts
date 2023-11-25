import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { WingsPage } from './page'
import { AddOrUpdateWingsPage } from './add-or-update-page/add-or-update-page'
const routes: Routes = [
  {
    path: '',
    component: WingsPage,
  },
  {
    path: 'add',
    component: AddOrUpdateWingsPage,
  },
  {
    path: 'update/:id',
    component: AddOrUpdateWingsPage,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WingsPageRoutingModule {}
