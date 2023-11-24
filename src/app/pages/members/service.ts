import { Injectable, inject } from "@angular/core";
import { Auth, User, user } from "@angular/fire/auth";
import {
  CollectionReference,
  FieldValue,
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
import { Observable } from "rxjs";
import { IFirestoreTime } from "../../interfaces/firestoreTime";

export interface IMember {
  id?: string;
  uid: string;
  apartment: string;
  lastUpdatedOn?: IFirestoreTime;
  createdOn?: FieldValue;
  lastUpdatedBy?: string;
  createdBy?: string;
}

@Injectable({
  providedIn: "root",
})
export class MembersService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  // prettier-ignore
  membersCollection: CollectionReference<IMember> = collection(this.firestore, "members") as CollectionReference<IMember>;
  // prettier-ignore
  membersCollectionWithQuery = query( this.membersCollection, orderBy("apartment", "asc") );
  // prettier-ignore
  members$: Observable<IMember[]> = collectionData(this.membersCollectionWithQuery, { idField: "id" }) as Observable<IMember[]>;
  auth: Auth = inject(Auth);
  user$: Observable<User> = user(this.auth);

  async addMember(member: IMember, userUid: string) {
    try {
      await addDoc(this.membersCollection, {
        ...member,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getMember(memberId: string) {
    const documentReference = doc<IMember>(this.membersCollection, memberId);
    return getDoc(documentReference);
  }

  async updateMember(member: any, memberId: string, userUid: string) {
    try {
      const documentReference = doc(this.membersCollection, memberId);
      // prettier-ignore
      updateDoc(documentReference, { ...member, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteMember(memberId: string) {
    const documentReference = doc(this.membersCollection, memberId);
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
