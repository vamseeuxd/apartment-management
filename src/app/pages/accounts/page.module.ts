import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { AccountsPage } from "./page";
import { AccountsPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateAccountsPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountsPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [AccountsPage, AddOrUpdateAccountsPage],
})
export class AccountsModule {}
