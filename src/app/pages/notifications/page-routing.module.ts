import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotificationsPage } from "./page";
import { AddOrUpdateNotificationsPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: NotificationsPage,
  },
  {
    path: "add",
    component: AddOrUpdateNotificationsPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateNotificationsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsPageRoutingModule {}
