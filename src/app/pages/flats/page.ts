import { Observable, combineLatest, of } from "rxjs";
import {
  groupBy,
  map,
  mergeMap,
  reduce,
  switchMap,
  toArray,
} from "rxjs/operators";
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoaderService } from "../../services/loader/loader.service";
import { FlatsService } from "./service";
import { ApartmentsService } from "../apartments/service";
import { WingsService } from "../wings/service";
import { IFlat } from "../../interfaces/IFlat";
import { IWing } from "../../interfaces/IWing";

@Component({
  selector: "page-flats",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class FlatsPage {
  flats$: Observable<IFlat[]>;
  flatsByFloors$: Observable<any>;

  constructor(
    private alertController: AlertController,
    public loader: LoaderService,
    private service: FlatsService,
    public apartmentService: ApartmentsService,
    public wingsService: WingsService
  ) {
    this.flats$ = this.service.flats$;
    this.flatsByFloors$ = this.flats$.pipe(
      map((masterFlats) => {
        const groupedByWings: any = {};
        const wings: any[] = [];
        masterFlats.forEach((flat) => {
          if (!groupedByWings[flat.wing]) {
            groupedByWings[flat.wing] = [];
          }
          groupedByWings[flat.wing].push(flat);
        });
        Object.entries(groupedByWings).forEach(async ([wingId, flats]) => {
          const wing = await wingsService.getWing(wingId);
          wings.push({
            wing: { ...wing.data(), id: wing.id },
            floors: this.groupFlatsByFloors(flats),
          });
        });
        return wings;
      })
      /* switchMap((flats) => {
        const groupedArray: any = {};
        flats.forEach((flat) => {
          if (!groupedArray[flat.floor]) {
            groupedArray[flat.floor] = [];
          }
          groupedArray[flat.floor].push(flat);
        });
        return of(
          Object.entries(groupedArray).map(([floor, flats]) => ({
            floor: `Floor-${floor}`,
            flats,
          }))
        );
      }), */
    );
  }

  groupFlatsByFloors(flats): any[] {
    // { floor: string; flats: IFlat[] }[]
    const floorsGroup: any = {};
    flats.forEach((flat) => {
      if (!floorsGroup[flat.floor]) {
        floorsGroup[flat.floor] = [];
      }
      floorsGroup[flat.floor].push(flat);
    });
    return Object.entries(floorsGroup).map(([floor, flats]) => ({
      name: `Floor-${floor}`,
      flats,
    }));
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
