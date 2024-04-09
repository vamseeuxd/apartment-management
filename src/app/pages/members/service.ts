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
export class MembersService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  apartmentsCollection = collection(this.firestore, "members");
  apartmentsCollectionWithQuery = query(this.apartmentsCollection, orderBy("name", "asc"));
  // prettier-ignore
  members$: Observable<any[]> = collectionData(this.apartmentsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addMember(member, userUid: string) {
    try {
      await addDoc(this.apartmentsCollection, {
        ...member,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getMember(apartmentId: string) {
    const documentReference = doc(this.apartmentsCollection, apartmentId);
    return getDoc(documentReference);
  }

  async updateMember(member: any, apartmentId: string, userUid: string) {
    try {
      const documentReference = doc(this.apartmentsCollection, apartmentId);
      // prettier-ignore
      updateDoc(documentReference, { ...member, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteMember(apartmentId: string) {
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
