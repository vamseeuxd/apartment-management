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
export class AccountsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  accountsCollection = collection(this.firestore, "accounts");
  accountsCollectionWithQuery = query(this.accountsCollection, orderBy("name", "asc"));
  // prettier-ignore
  accounts$: Observable<any[]> = collectionData(this.accountsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addAccount(account, userUid: string) {
    try {
      await addDoc(this.accountsCollection, {
        ...account,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getAccount(accountId: string) {
    const documentReference = doc(this.accountsCollection, accountId);
    return getDoc(documentReference);
  }

  async updateAccount(account: any, accountId: string, userUid: string) {
    try {
      const documentReference = doc(this.accountsCollection, accountId);
      // prettier-ignore
      updateDoc(documentReference, { ...account, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteAccount(accountId: string) {
    const documentReference = doc(this.accountsCollection, accountId);
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
