import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AccountsPage } from "./page";
import { AddOrUpdateAccountsPage } from "./add-or-update-page/add-or-update-page";
const routes: Routes = [
  {
    path: "",
    component: AccountsPage,
  },
  {
    path: "add",
    component: AddOrUpdateAccountsPage,
  },
  {
    path: "update/:id",
    component: AddOrUpdateAccountsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsPageRoutingModule {}
