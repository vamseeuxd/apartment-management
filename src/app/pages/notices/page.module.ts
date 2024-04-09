import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { NoticesPage } from "./page";
import { NoticesPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateNoticesPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NoticesPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [NoticesPage, AddOrUpdateNoticesPage],
})
export class NoticesModule {}
