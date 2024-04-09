import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OwnersPage } from "./page";
import { AddOrUpdateOwnersPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: OwnersPage,
  },
  {
    path: "add",
    component: AddOrUpdateOwnersPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateOwnersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnersPageRoutingModule {}
