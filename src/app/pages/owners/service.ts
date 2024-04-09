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
export class OwnersService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  ownersCollection = collection(this.firestore, "owners");
  ownersCollectionWithQuery = query(this.ownersCollection, orderBy("name", "asc"));
  // prettier-ignore
  owners$: Observable<any[]> = collectionData(this.ownersCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addOwner(owner, userUid: string) {
    try {
      await addDoc(this.ownersCollection, {
        ...owner,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getOwner(ownerId: string) {
    const documentReference = doc(this.ownersCollection, ownerId);
    return getDoc(documentReference);
  }

  async updateOwner(owner: any, ownerId: string, userUid: string) {
    try {
      const documentReference = doc(this.ownersCollection, ownerId);
      // prettier-ignore
      updateDoc(documentReference, { ...owner, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteOwner(ownerId: string) {
    const documentReference = doc(this.ownersCollection, ownerId);
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
