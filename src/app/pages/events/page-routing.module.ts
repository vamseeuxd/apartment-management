import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EventsPage } from "./page";
import { AddOrUpdateEventsPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: EventsPage,
  },
  {
    path: "add",
    component: AddOrUpdateEventsPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateEventsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
