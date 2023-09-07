import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FlatsPage } from "./page";
import { AddOrUpdateFlatsPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: FlatsPage,
  },
  {
    path: "add",
    component: AddOrUpdateFlatsPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateFlatsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatsPageRoutingModule {}
