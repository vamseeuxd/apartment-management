import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ApartmentsPage } from "./page";
import { AddOrUpdateApartmentsPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: ApartmentsPage,
  },
  {
    path: "add",
    component: AddOrUpdateApartmentsPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateApartmentsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartmentsPageRoutingModule {}
