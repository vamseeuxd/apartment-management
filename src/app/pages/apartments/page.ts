import { Observable } from "rxjs";
import { Component, OnInit, inject } from "@angular/core";
import { AlertController } from "@ionic/angular";
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from "@angular/fire/firestore";
import { LoaderService } from "../../services/loader/loader.service";

@Component({
  selector: "page-apartments",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class ApartmentsPage {
  apartments$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  apartmentsCollection: CollectionReference;
  constructor(
    private alertController: AlertController,
    public loader: LoaderService
  ) {
    this.apartmentsCollection = collection(this.firestore, "apartments");
    this.apartments$ = collectionData(this.apartmentsCollection, {
      idField: "id",
    }) as Observable<any[]>;
  }
  async deleteItem(
    slidingItem: HTMLIonItemSlidingElement,
    apartmentId: string
  ) {
    await slidingItem.close();
    const alert = await this.alertController.create({
      header: "Delete Confirmation",
      subHeader: "Are you sure! Do you want to delete?",
      buttons: [
        {
          text: "Yes",
          handler: async () => {
            const id = this.loader.show();
            const documentReference = doc(
              this.apartmentsCollection,
              apartmentId
            );
            this.loader.hide(id);
            try {
              await deleteDoc(documentReference);
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
  getAddressString(apartment: any) {
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
