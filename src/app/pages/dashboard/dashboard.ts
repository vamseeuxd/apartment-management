import { Component, HostListener } from "@angular/core";
import { AppModules } from "../../utilities/app-modules";
import { ApartmentsService } from "../apartments/service";

@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html",
  styleUrls: ["./dashboard.scss"],
})
export class DashboardPage {
  modules = AppModules;
  titleWidth = 120;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.titleWidth = window.innerWidth / 3 - 18;
  }
  constructor(public service: ApartmentsService) {
    this.titleWidth = window.innerWidth / 3 - 18;
  }
}
