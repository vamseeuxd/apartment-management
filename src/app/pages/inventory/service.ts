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
export class InventorysService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  inventorysCollection = collection(this.firestore, "inventorys");
  inventorysCollectionWithQuery = query(this.inventorysCollection, orderBy("name", "asc"));
  // prettier-ignore
  inventorys$: Observable<any[]> = collectionData(this.inventorysCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addInventory(inventory, userUid: string) {
    try {
      await addDoc(this.inventorysCollection, {
        ...inventory,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getInventory(inventoryId: string) {
    const documentReference = doc(this.inventorysCollection, inventoryId);
    return getDoc(documentReference);
  }

  async updateInventory(inventory: any, inventoryId: string, userUid: string) {
    try {
      const documentReference = doc(this.inventorysCollection, inventoryId);
      // prettier-ignore
      updateDoc(documentReference, { ...inventory, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteInventory(inventoryId: string) {
    const documentReference = doc(this.inventorysCollection, inventoryId);
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
