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
export class TenantsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  tenantsCollection = collection(this.firestore, "tenants");
  tenantsCollectionWithQuery = query(this.tenantsCollection, orderBy("name", "asc"));
  // prettier-ignore
  tenants$: Observable<any[]> = collectionData(this.tenantsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addTenant(tenant, userUid: string) {
    try {
      await addDoc(this.tenantsCollection, {
        ...tenant,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getTenant(tenantId: string) {
    const documentReference = doc(this.tenantsCollection, tenantId);
    return getDoc(documentReference);
  }

  async updateTenant(tenant: any, tenantId: string, userUid: string) {
    try {
      const documentReference = doc(this.tenantsCollection, tenantId);
      // prettier-ignore
      updateDoc(documentReference, { ...tenant, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteTenant(tenantId: string) {
    const documentReference = doc(this.tenantsCollection, tenantId);
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
