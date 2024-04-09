import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TenantsPage } from "./page";
import { AddOrUpdateTenantsPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: TenantsPage,
  },
  {
    path: "add",
    component: AddOrUpdateTenantsPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateTenantsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantsPageRoutingModule {}
