import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { VehiclesPage } from "./page";
import { VehiclesPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateVehiclesPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VehiclesPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [VehiclesPage, AddOrUpdateVehiclesPage],
})
export class VehiclesModule {}
