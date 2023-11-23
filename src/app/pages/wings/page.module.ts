import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { WingsPage } from "./page";
import { WingsPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateWingsPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */
import { SharedModule } from "../../components/shared.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    WingsPageRoutingModule,
    FormsModule,
    MaskitoModule,
    SharedModule,
  ],
  declarations: [WingsPage, AddOrUpdateWingsPage],
})
export class WingsModule {}
