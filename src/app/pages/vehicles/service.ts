import { Injectable, inject } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import {
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
import { Observable, lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VehiclesService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  apartmentsCollection = collection(this.firestore, "vehicles");
  apartmentsCollectionWithQuery = query(this.apartmentsCollection, orderBy("name", "asc"));
  // prettier-ignore
  vehicles$: Observable<any[]> = collectionData(this.apartmentsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addVehicle(vehicle, userUid: string) {
    try {
      await addDoc(this.apartmentsCollection, {
        ...vehicle,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getVehicle(apartmentId: string) {
    const documentReference = doc(this.apartmentsCollection, apartmentId);
    return getDoc(documentReference);
  }

  async updateVehicle(vehicle: any, apartmentId: string, userUid: string) {
    try {
      const documentReference = doc(this.apartmentsCollection, apartmentId);
      // prettier-ignore
      updateDoc(documentReference, { ...vehicle, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteVehicle(apartmentId: string) {
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
