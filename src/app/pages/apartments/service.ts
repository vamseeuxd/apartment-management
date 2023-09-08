import { Injectable, inject } from "@angular/core";
import { Auth, User, user } from "@angular/fire/auth";
import {
  CollectionReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { Observable } from "rxjs";
import { IFirestoreTime } from "../../utilities/firestoreTime";

export interface IApartment {
  id: string;
  name: string;
  registrationNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
  lastUpdatedOn?: IFirestoreTime;
  createdOn?: IFirestoreTime;
  lastUpdatedBy?: string;
  createdBy?: string;
}

@Injectable({
  providedIn: "root",
})
export class ApartmentsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  // prettier-ignore
  apartmentsCollection: CollectionReference<IApartment> = collection(this.firestore, "apartments") as CollectionReference<IApartment>;
  // prettier-ignore
  apartmentsCollectionWithQuery = query( this.apartmentsCollection, orderBy("name", "asc") );
  // prettier-ignore
  apartments$: Observable<IApartment[]> = collectionData(this.apartmentsCollectionWithQuery, { idField: "id" }) as Observable<IApartment[]>;
  auth: Auth = inject(Auth);
  user$: Observable<User> = user(this.auth);

  async addApartment(apartment: IApartment, userUid: string) {
    try {
      await addDoc(this.apartmentsCollection, {
        ...apartment,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getApartment(apartmentId: string) {
    const documentReference = doc<IApartment>(
      this.apartmentsCollection,
      apartmentId
    );
    return getDoc(documentReference);
  }

  async updateApartment(apartment: any, apartmentId: string, userUid: string) {
    try {
      const documentReference = doc(this.apartmentsCollection, apartmentId);
      // prettier-ignore
      updateDoc(documentReference, { ...apartment, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteApartment(apartmentId: string) {
    const documentReference = doc(this.apartmentsCollection, apartmentId);
    try {
      await deleteDoc(documentReference);
    } catch (error) {
      this.showError(error);
    }
  }

  async showError(error: any) {
    // prettier-ignore
    const toast = await this.toastController.create({ message: error.message, duration: 1500, position: "bottom" });
    await toast.present();
  }
}
