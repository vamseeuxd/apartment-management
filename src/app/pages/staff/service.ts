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
export class StaffsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  staffsCollection = collection(this.firestore, "staffs");
  staffsCollectionWithQuery = query(this.staffsCollection, orderBy("name", "asc"));
  // prettier-ignore
  staffs$: Observable<any[]> = collectionData(this.staffsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addStaff(staff, userUid: string) {
    try {
      await addDoc(this.staffsCollection, {
        ...staff,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getStaff(staffId: string) {
    const documentReference = doc(this.staffsCollection, staffId);
    return getDoc(documentReference);
  }

  async updateStaff(staff: any, staffId: string, userUid: string) {
    try {
      const documentReference = doc(this.staffsCollection, staffId);
      // prettier-ignore
      updateDoc(documentReference, { ...staff, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteStaff(staffId: string) {
    const documentReference = doc(this.staffsCollection, staffId);
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
