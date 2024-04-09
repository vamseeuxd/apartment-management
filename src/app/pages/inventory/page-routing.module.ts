import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InventorysPage } from "./page";
import { AddOrUpdateInventorysPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: InventorysPage,
  },
  {
    path: "add",
    component: AddOrUpdateInventorysPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateInventorysPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventorysPageRoutingModule {}
