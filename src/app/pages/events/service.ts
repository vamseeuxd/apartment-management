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
export class EventsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  eventsCollection = collection(this.firestore, "events");
  eventsCollectionWithQuery = query(this.eventsCollection, orderBy("name", "asc"));
  // prettier-ignore
  events$: Observable<any[]> = collectionData(this.eventsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addEvent(event, userUid: string) {
    try {
      await addDoc(this.eventsCollection, {
        ...event,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getEvent(eventId: string) {
    const documentReference = doc(this.eventsCollection, eventId);
    return getDoc(documentReference);
  }

  async updateEvent(event: any, eventId: string, userUid: string) {
    try {
      const documentReference = doc(this.eventsCollection, eventId);
      // prettier-ignore
      updateDoc(documentReference, { ...event, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteEvent(eventId: string) {
    const documentReference = doc(this.eventsCollection, eventId);
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
