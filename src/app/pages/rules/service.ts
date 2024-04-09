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
export class RulesService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  apartmentsCollection = collection(this.firestore, "rules");
  apartmentsCollectionWithQuery = query(this.apartmentsCollection, orderBy("name", "asc"));
  // prettier-ignore
  rules$: Observable<any[]> = collectionData(this.apartmentsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addRule(rule, userUid: string) {
    try {
      await addDoc(this.apartmentsCollection, {
        ...rule,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getRule(apartmentId: string) {
    const documentReference = doc(this.apartmentsCollection, apartmentId);
    return getDoc(documentReference);
  }

  async updateRule(rule: any, apartmentId: string, userUid: string) {
    try {
      const documentReference = doc(this.apartmentsCollection, apartmentId);
      // prettier-ignore
      updateDoc(documentReference, { ...rule, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteRule(apartmentId: string) {
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
