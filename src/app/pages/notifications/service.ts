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
export class NotificationsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  notificationsCollection = collection(this.firestore, "notifications");
  notificationsCollectionWithQuery = query(this.notificationsCollection, orderBy("name", "asc"));
  // prettier-ignore
  notifications$: Observable<any[]> = collectionData(this.notificationsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addNotification(notification, userUid: string) {
    try {
      await addDoc(this.notificationsCollection, {
        ...notification,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getNotification(notificationId: string) {
    const documentReference = doc(this.notificationsCollection, notificationId);
    return getDoc(documentReference);
  }

  async updateNotification(notification: any, notificationId: string, userUid: string) {
    try {
      const documentReference = doc(this.notificationsCollection, notificationId);
      // prettier-ignore
      updateDoc(documentReference, { ...notification, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteNotification(notificationId: string) {
    const documentReference = doc(this.notificationsCollection, notificationId);
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
