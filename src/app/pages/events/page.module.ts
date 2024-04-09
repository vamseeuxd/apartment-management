import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { EventsPage } from "./page";
import { EventsPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateEventsPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EventsPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [EventsPage, AddOrUpdateEventsPage],
})
export class EventsModule {}
