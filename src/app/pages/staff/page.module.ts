import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { StaffsPage } from "./page";
import { StaffsPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateStaffsPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    StaffsPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [StaffsPage, AddOrUpdateStaffsPage],
})
export class StaffsModule {}
