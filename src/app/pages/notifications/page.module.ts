import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { NotificationsPage } from "./page";
import { NotificationsPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateNotificationsPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NotificationsPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [NotificationsPage, AddOrUpdateNotificationsPage],
})
export class NotificationsModule {}
