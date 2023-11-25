import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'

import { ApartmentsPage } from './page'
import { ApartmentsPageRoutingModule } from './page-routing.module'
import { AddOrUpdateApartmentsPage } from './add-or-update-page/add-or-update-page'
import { FormsModule } from '@angular/forms'
import { MaskitoModule } from '@maskito/angular' /* https://maskito.dev/getting-started/maskito-libraries */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ApartmentsPageRoutingModule,
    FormsModule,
    MaskitoModule,
  ],
  declarations: [ApartmentsPage, AddOrUpdateApartmentsPage],
})
export class ApartmentsModule {}
