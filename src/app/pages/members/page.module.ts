import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { MembersPage } from "./page";
import { MembersPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateMembersPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MembersPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [MembersPage, AddOrUpdateMembersPage],
})
export class MembersModule {}
