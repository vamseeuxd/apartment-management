import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ApartmentsPage } from './page';
import { ApartmentsPageRoutingModule } from './page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ApartmentsPageRoutingModule
  ],
  declarations: [ApartmentsPage],
})
export class ApartmentsModule {}
