import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NoticesPage } from "./page";
import { AddOrUpdateNoticesPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: NoticesPage,
  },
  {
    path: "add",
    component: AddOrUpdateNoticesPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateNoticesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticesPageRoutingModule {}
