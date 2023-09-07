import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { FlatsPage } from "./page";
import { FlatsPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateFlatsPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FlatsPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [FlatsPage, AddOrUpdateFlatsPage],
})
export class FlatsModule {}
