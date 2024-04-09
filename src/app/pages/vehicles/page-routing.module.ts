import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { VehiclesPage } from "./page";
import { AddOrUpdateVehiclesPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: VehiclesPage,
  },
  {
    path: "add",
    component: AddOrUpdateVehiclesPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateVehiclesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesPageRoutingModule {}
