import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MembersPage } from './page'
import { AddOrUpdateMembersPage } from './add-or-update-page/add-or-update-page'
const routes: Routes = [
  {
    path: '',
    component: MembersPage,
  },
  {
    path: 'add',
    component: AddOrUpdateMembersPage,
  },
  {
    path: 'update/:id',
    component: AddOrUpdateMembersPage,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersPageRoutingModule {}
