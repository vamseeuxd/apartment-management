import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoaderService } from "../../services/loader/loader.service";
import { WingsService } from "./service";
import { ApartmentsService } from "../../services/apartments/apartments.service";

@Component({
  selector: "page-wings",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class WingsPage {
  wings$: Observable<any[]>;
  apartments$: Observable<any[]>;
  apartmentsWithWings$: Observable<any[]>;
  constructor(
    private alertController: AlertController,
    public loader: LoaderService,
    private service: WingsService,
    private apartmentService: ApartmentsService
  ) {
    this.wings$ = this.service.wings$;
    this.apartments$ = this.apartmentService.apartments$;
    this.apartmentsWithWings$ = combineLatest([
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
    );
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
