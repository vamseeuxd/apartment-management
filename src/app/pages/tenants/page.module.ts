import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { TenantsPage } from "./page";
import { TenantsPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateTenantsPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TenantsPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [TenantsPage, AddOrUpdateTenantsPage],
})
export class TenantsModule {}
