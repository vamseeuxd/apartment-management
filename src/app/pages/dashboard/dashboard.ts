import { Component } from "@angular/core";
import { ConferenceData } from "../../providers/conference-data";

@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html",
  styleUrls: ["./dashboard.scss"],
})
export class DashboardPage {
  modules123: any[] = [];

  modules = [
    { color:'primary', icon:"people-outline",  id: "Owners", profilePic: "/assets/img/owner.png", name: "Owners", title: "Owners" },
    { color:'secondary', icon:"newspaper-outline",  id: "Accounts", profilePic: "/assets/img/accounts.png", name: "Accounts", title: "Accounts" },
    { color:'tertiary', icon:"people-circle-outline",  id: "Visitors", profilePic: "/assets/img/visitors.png", name: "Visitors", title: "Visitors" },
    { color:'success', icon:"alert-circle-outline",  id: "Notices", profilePic: "/assets/img/notices.png", name: "Notices", title: "Notices" },
    { color:'warning', icon:"calendar-number-outline",  id: "Events", profilePic: "/assets/img/events.png", name: "Events", title: "Events" },
    { color:'danger', icon:"checkmark-done-outline",  id: "Rules", profilePic: "/assets/img/rules.png", name: "Rules", title: "Rules" },
    { color:'medium', icon:"business-outline",  id: "Apartments", profilePic: "/assets/img/wings.png", name: "Apartments", title: "Apartments" },
    { color:'dark', icon:"grid-outline",  id: "Wings", profilePic: "/assets/img/wings.png", name: "Wings", title: "Wings" },
    { color:'primary', icon:"scan-circle-outline",  id: "Flat", profilePic: "/assets/img/flat.png", name: "Flat", title: "Flat" },
  ];

  constructor(public confData: ConferenceData) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((modules: any[]) => {
      // this.modules = modules;
    });
  }
}
