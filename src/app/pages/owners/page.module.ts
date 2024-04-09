import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { OwnersPage } from "./page";
import { OwnersPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateOwnersPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    OwnersPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [OwnersPage, AddOrUpdateOwnersPage],
})
export class OwnersModule {}
