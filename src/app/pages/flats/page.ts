import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoaderService } from "../../services/loader/loader.service";
import { FlatsService, IFlat } from "./service";
import { ApartmentsService } from "../apartments/service";
import { IWing, WingsService } from "../wings/service";

@Component({
  selector: "page-flats",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class FlatsPage {
  flats$: Observable<IFlat[]>;
  apartments$: Observable<any[]>;
  wings$: Observable<IWing[]>;
  apartmentsWithFlats$: Observable<any[]>;
  constructor(
    private alertController: AlertController,
    public loader: LoaderService,
    private service: FlatsService,
    private apartmentService: ApartmentsService,
    private wingsService: WingsService
  ) {
    this.flats$ = this.service.flats$;
    this.apartments$ = this.apartmentService.apartments$;
    this.wings$ = this.wingsService.wings$;
    this.apartmentsWithFlats$ = combineLatest([
      this.apartments$,
      this.flats$,
      this.wings$,
    ]).pipe(
      map(([apartments, flats, wings]) => {
        const returnValue = [];
        apartments.forEach((apartment) => {
          const groupedApartment = {
            ...apartment,
            wings: wings
              .filter((wing) => apartment.id == wing.apartment)
              .map((wing) => {
                wing.flats = flats.filter((flat) => wing.id == flat.wing)
                return wing;
              }),
          };
          returnValue.push(groupedApartment);
        });
        return returnValue;
      })
    );
  }

  // prettier-ignore
  async deleteItem( slidingItem: HTMLIonItemSlidingElement, flatId: string ) {
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
                await this.service.deleteFlat(flatId);
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
