import { Component, HostListener } from '@angular/core'
import { AppModules } from '../../utilities/app-modules'
import { ApartmentBase } from '../../base-classes/apartment-base'

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardPage extends ApartmentBase {
  modules = AppModules
  titleWidth = 120
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.titleWidth = window.innerWidth / 3 - 18
  }
  constructor() {
    super()
    this.titleWidth = window.innerWidth / 3 - 18
  }
}
