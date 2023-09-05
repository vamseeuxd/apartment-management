import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { ApartmentsPage } from "./page";
import { ApartmentsPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateApartmentsPage } from "./add-or-update-page/add-or-update-page";

@NgModule({
  imports: [CommonModule, IonicModule, ApartmentsPageRoutingModule],
  declarations: [ApartmentsPage, AddOrUpdateApartmentsPage],
})
export class ApartmentsModule {}
