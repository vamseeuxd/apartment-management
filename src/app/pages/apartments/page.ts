import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "page-apartments",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class ApartmentsPage {
  constructor(private alertController: AlertController) {}
  async deleteItem(slidingItem: HTMLIonItemSlidingElement, apartmentData: any) {
    await slidingItem.close();
    const alert = await this.alertController.create({
      header: "Delete Confirmation",
      subHeader: "Are you sure! Do you want to delete?",
      buttons: ["Yes", "No"],
    });
    await alert.present();
  }
}
