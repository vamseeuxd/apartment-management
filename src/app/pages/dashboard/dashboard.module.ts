import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard';
import { DashboardPageRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage],
})
export class DashboardListModule {}
