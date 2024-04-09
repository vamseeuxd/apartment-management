import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { VisitorsPage } from "./page";
import { AddOrUpdateVisitorsPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: VisitorsPage,
  },
  {
    path: "add",
    component: AddOrUpdateVisitorsPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateVisitorsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorsPageRoutingModule {}
