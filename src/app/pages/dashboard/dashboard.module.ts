import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedModule
  ],
  declarations: [DashboardPage],
})
export class DashboardListModule {}
