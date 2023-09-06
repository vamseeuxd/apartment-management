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
  serverTimestamp,
  updateDoc,
} from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WingsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  wingsCollection = collection(this.firestore, "wings");
  // prettier-ignore
  wings$: Observable<any[]> = collectionData(this.wingsCollection, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addWing(wing, userUid: string) {
    try {
      await addDoc(this.wingsCollection, {
        ...wing,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getWing(wingId: string) {
    const documentReference = doc(this.wingsCollection, wingId);
    return getDoc(documentReference);
  }

  async updateWing(wing: any, wingId: string, userUid: string) {
    try {
      const documentReference = doc(this.wingsCollection, wingId);
      // prettier-ignore
      updateDoc(documentReference, { ...wing, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteWing(wingId: string) {
    const documentReference = doc(this.wingsCollection, wingId);
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
