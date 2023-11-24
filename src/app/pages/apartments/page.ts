import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Component, inject } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { LoaderService } from "../../services/loader/loader.service";
import { IApartment } from "../../interfaces/IApartment";
import { ApartmentsByUserService } from "../../services/apartments/ApartmentsServiceByUser";

@Component({
  selector: "page-apartments",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class ApartmentsPage {
  apartments$: Observable<IApartment[]>;
  toastController: ToastController = inject(ToastController);
  constructor(
    private alertController: AlertController,
    public loader: LoaderService,
    private service: ApartmentsByUserService
  ) {
    const id = this.loader.show();
    this.apartments$ = this.service.apartments$.pipe(
      tap(() => {
        this.loader.hide(id);
      })
    );
  }

  // prettier-ignore
  async deleteItem( slidingItem: HTMLIonItemSlidingElement, apartmentId: string ) {
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
                await this.service.deleteApartment(apartmentId);
                this.loader.hide(id);
                const toast = await this.toastController.create({ message: 'Apartment Deleted Successfully', duration: 1500, position: "bottom" });
                await toast.present();
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
  getAddressString(apartment: IApartment) {
    const {
      addressLine1,
      addressLine2,
      city,
      district,
      state,
      country,
      pincode,
    } = apartment;
    return Object.values({
      addressLine1: `${addressLine1}`,
      addressLine2: addressLine2 ? `${addressLine2}` : null,
      city: `${city}`,
      district: `${district}`,
      state: `${state}`,
      country: `${country}`,
      pincode: `${pincode}`,
    })
      .filter((val) => !!val)
      .join(", ");
    // .join("<br>");
  }
}
