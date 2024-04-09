import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RulesPage } from "./page";
import { AddOrUpdateRulesPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: RulesPage,
  },
  {
    path: "add",
    component: AddOrUpdateRulesPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateRulesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RulesPageRoutingModule {}
