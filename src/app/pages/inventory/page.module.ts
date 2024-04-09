import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { InventorysPage } from "./page";
import { InventorysPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateInventorysPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    InventorysPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [InventorysPage, AddOrUpdateInventorysPage],
})
export class InventorysModule {}
