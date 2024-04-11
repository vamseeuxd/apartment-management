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
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class FlatsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  flatsCollection = collection(this.firestore, "flats");
  flatsCollectionWithQuery = query(
    this.flatsCollection,
    orderBy("name", "asc")
  );
  // prettier-ignore
  flats$: Observable<any[]> = collectionData(this.flatsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  constructor() {}

  async addFlat(flat, userUid: string) {
    try {
      await addDoc(this.flatsCollection, {
        ...flat,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getFlat(flatId: string) {
    const documentReference = doc(this.flatsCollection, flatId);
    return getDoc(documentReference);
  }

  async updateFlat(flat: any, flatId: string, userUid: string) {
    try {
      const documentReference = doc(this.flatsCollection, flatId);
      // prettier-ignore
      updateDoc(documentReference, { ...flat, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteFlat(flatId: string) {
    const documentReference = doc(this.flatsCollection, flatId);
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
