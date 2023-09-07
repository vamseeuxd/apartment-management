import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoaderService } from "../../services/loader/loader.service";
import { FlatsService } from "./service";
import { ApartmentsService } from "../apartments/service";

@Component({
  selector: "page-flats",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class FlatsPage {
  flats$: Observable<any[]>;
  apartments$: Observable<any[]>;
  apartmentsWithFlats$: Observable<any[]>;
  constructor(
    private alertController: AlertController,
    public loader: LoaderService,
    private service: FlatsService,
    private apartmentService: ApartmentsService
  ) {
    this.flats$ = this.service.flats$;
    this.apartments$ = this.apartmentService.apartments$;
    this.apartmentsWithFlats$ = combineLatest([
      this.apartments$,
      this.flats$,
    ]).pipe(
      map(([apartments, flats]) => {
        const returnValue = [];
        apartments.forEach((apartment) => {
          const groupedApartment = {
            ...apartment,
            flats: flats.filter((flat) => apartment.id == flat.apartment),
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
