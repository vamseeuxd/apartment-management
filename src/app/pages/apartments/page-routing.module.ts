import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ApartmentsPage } from "./page";
const routes: Routes = [
  {
    path: "",
    component: ApartmentsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartmentsPageRoutingModule {}
