import { Component, HostListener, inject } from "@angular/core";
import { AppModules } from "../../utilities/app-modules";
import {
  ApartmentsService,
  IApartment,
} from "../../services/apartments/apartments.service";
import { Observable } from "rxjs";

@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html",
  styleUrls: ["./dashboard.scss"],
})
export class DashboardPage {
  modules = AppModules;
  titleWidth = 120;
  public apartmentsService: ApartmentsService = inject(ApartmentsService);
  apartments: IApartment[] = [];
  selectedApartment: IApartment;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.titleWidth = window.innerWidth / 3 - 18;
  }
  constructor() {
    this.titleWidth = window.innerWidth / 3 - 18;
    this.apartmentsService
      .selectedApartment$
      .subscribe((aparment) => {
        this.selectedApartment = aparment;
      });
  }
}
