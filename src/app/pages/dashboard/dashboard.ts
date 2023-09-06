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
    { route:'../owners', color:'primary',  icon:"people-outline",            id: "Owners", profilePic: "/assets/img/owner.png", name: "Owners", title: "Owners" },
    { route:'../accounts', color:'secondary',icon:"newspaper-outline",         id: "Accounts", profilePic: "/assets/img/accounts.png", name: "Accounts", title: "Accounts" },
    { route:'../visitors', color:'tertiary', icon:"people-circle-outline",     id: "Visitors", profilePic: "/assets/img/visitors.png", name: "Visitors", title: "Visitors" },
    { route:'../notices', color:'success',  icon:"alert-circle-outline",      id: "Notices", profilePic: "/assets/img/notices.png", name: "Notices", title: "Notices" },
    { route:'../events', color:'warning',  icon:"calendar-number-outline",   id: "Events", profilePic: "/assets/img/events.png", name: "Events", title: "Events" },
    { route:'../rules', color:'danger',   icon:"checkmark-done-outline",    id: "Rules", profilePic: "/assets/img/rules.png", name: "Rules", title: "Rules" },
    { route:'../apartments', color:'medium',   icon:"business-outline",       id: "Apartments", profilePic: "/assets/img/wings.png", name: "Apartments", title: "Apartments" },
    { route:'../wings', color:'dark',     icon:"grid-outline",              id: "Wings", profilePic: "/assets/img/wings.png", name: "Wings", title: "Wings" },
    { route:'../flat', color:'primary',  icon:"scan-circle-outline",       id: "Flat", profilePic: "/assets/img/flat.png", name: "Flat", title: "Flat" },
    { route:'../vehicles', color:'secondary',  icon:"car-sport-outline",       id: "Vehicles", profilePic: "/assets/img/flat.png", name: "Vehicles", title: "Vehicles" },
    { route:'../members', color:'tertiary',  icon:"person-add-outline",       id: "Members", profilePic: "/assets/img/flat.png", name: "Members", title: "Members" },
    { route:'../staff', color:'success',  icon:"person-circle-outline",       id: "Staff", profilePic: "/assets/img/flat.png", name: "Staff", title: "Staff" },
  ];

  constructor(public confData: ConferenceData) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((modules: any[]) => {
      // this.modules = modules;
    });
  }
}
