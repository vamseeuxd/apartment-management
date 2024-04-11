import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoaderService } from "../../services/loader/loader.service";
import { WingsService } from "./service";
import { ApartmentsService } from "../apartments/service";
import { IWing } from "../../interfaces/IWing";

@Component({
  selector: "page-wings",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class WingsPage {
  wings$: Observable<IWing[]>;
  constructor(
    private alertController: AlertController,
    public loader: LoaderService,
    private service: WingsService,
    public apartmentService: ApartmentsService
  ) {
    this.wings$ = this.service.wings$;
  }

  // prettier-ignore
  async deleteItem( slidingItem: HTMLIonItemSlidingElement, wingId: string ) {
    await slidingItem.close();
    const alert = await this.alertController.create(
      { 
        header: "Delete Confirmation", subHeader: "Are you sure! Do you want to delete?",
        buttons: [
          {
            text: "Yes",
            handler: async () => {
              const id = this.loader.show();
              try {
                await this.service.deleteWing(wingId);
                this.loader.hide(id);
              } catch (error) {
                this.loader.hide(id);
              }
            },
          },
          "No",
        ],
    });
    await alert.present();
  }
}
