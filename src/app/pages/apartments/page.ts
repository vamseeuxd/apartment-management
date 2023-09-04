import { Component, OnInit } from "@angular/core";

@Component({
  selector: "page-dashboard",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class ApartmentsPage implements OnInit {
  presentingElement = undefined;
  ngOnInit() {
    this.presentingElement = document.querySelector(".ion-page");
  }
}
