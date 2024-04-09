import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { RulesPage } from "./page";
import { RulesPageRoutingModule } from "./page-routing.module";
import { AddOrUpdateRulesPage } from "./add-or-update-page/add-or-update-page";
import { FormsModule } from "@angular/forms";
import { MaskitoModule } from "@maskito/angular"; /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RulesPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [RulesPage, AddOrUpdateRulesPage],
})
export class RulesModule {}
