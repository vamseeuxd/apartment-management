import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StaffsPage } from "./page";
import { AddOrUpdateStaffsPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: StaffsPage,
  },
  {
    path: "add",
    component: AddOrUpdateStaffsPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateStaffsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffsPageRoutingModule {}
