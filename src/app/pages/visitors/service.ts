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
export class VisitorsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  visitorsCollection = collection(this.firestore, "visitors");
  visitorsCollectionWithQuery = query(this.visitorsCollection, orderBy("name", "asc"));
  // prettier-ignore
  visitors$: Observable<any[]> = collectionData(this.visitorsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addVisitor(visitor, userUid: string) {
    try {
      await addDoc(this.visitorsCollection, {
        ...visitor,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getVisitor(visitorId: string) {
    const documentReference = doc(this.visitorsCollection, visitorId);
    return getDoc(documentReference);
  }

  async updateVisitor(visitor: any, visitorId: string, userUid: string) {
    try {
      const documentReference = doc(this.visitorsCollection, visitorId);
      // prettier-ignore
      updateDoc(documentReference, { ...visitor, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteVisitor(visitorId: string) {
    const documentReference = doc(this.visitorsCollection, visitorId);
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
