import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { VisitorsPage } from "./page";
import { VisitorsPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateVisitorsPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VisitorsPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [VisitorsPage, AddOrUpdateVisitorsPage],
})
export class VisitorsModule {}
