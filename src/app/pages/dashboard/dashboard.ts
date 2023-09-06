import { Component, HostListener } from "@angular/core";
import { AppModules } from "../../utilities/app-modules";

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
  constructor() {
    this.titleWidth = window.innerWidth / 3 - 18;
  }
}
