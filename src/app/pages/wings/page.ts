import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoaderService } from "../../services/loader/loader.service";
import { WingsService } from "./service";
import {
  ApartmentsService,
  IApartment,
} from "../../services/apartments/apartments.service";

@Component({
  selector: "page-wings",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class WingsPage {
  wings$: Observable<any[]>;
  apartments: IApartment[];
  selectedApartment: IApartment;
  apartmentsWithWings$: Observable<any[]>;
  constructor(
    public alertController: AlertController,
    public loader: LoaderService,
    public service: WingsService,
    public apartmentsService: ApartmentsService
  ) {
    this.wings$ = this.service.wings$;
    this.apartmentsService.selectedApartment$.subscribe((apartment) => {
      this.selectedApartment = apartment;
    });
    /* this.apartmentsWithWings$ = combineLatest([
      this.apartments$,
      this.wings$,
    ]).pipe(
      map(([apartments, wings]) => {
        const returnValue = [];
        apartments.forEach((apartment) => {
          const groupedApartment = {
            ...apartment,
            wings: wings.filter((wing) => apartment.id == wing.apartment),
          };
          returnValue.push(groupedApartment);
        });
        return returnValue;
      })
    ); */
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
