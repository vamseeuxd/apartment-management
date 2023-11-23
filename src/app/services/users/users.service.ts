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
  setDoc,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { Observable, lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  usersCollection = collection(this.firestore, "users");
  // prettier-ignore
  usersCollectionWithQuery = query( this.usersCollection, orderBy("displayName", "asc") );
  // prettier-ignore
  users$: Observable<any[]> = collectionData(this.usersCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  async addUser(user, userUid: string) {
    try {
      const documentReference = doc(this.usersCollection, userUid);
      await setDoc(documentReference, {
        ...user,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getUsersByUid(userId: string) {
    const documentReference = doc(this.usersCollection, userId);
    return getDoc(documentReference);
  }

  async updateUser(user: any, userId: string, userUid: string) {
    try {
      const documentReference = doc(this.usersCollection, userId);
      // prettier-ignore
      updateDoc(documentReference, { ...user, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteUser(userId: string) {
    const documentReference = doc(this.usersCollection, userId);
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
