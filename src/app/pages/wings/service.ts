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
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { Observable, of, switchMap } from "rxjs";
import { ApartmentsService } from "../apartments/service";
import { IWing } from "../../interfaces/IWing";


@Injectable({
  providedIn: "root",
})
export class WingsService {
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  wingsCollection = collection(this.firestore, "wings");
  // prettier-ignore
  wings$: Observable<IWing[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);

  constructor(public apartmentService: ApartmentsService) {
    this.wings$ = this.apartmentService.seletedApartment$.pipe(
      switchMap((aparment) => {
        if (aparment && aparment.id) {
          const wingsQuery = query(
            this.wingsCollection,
            where("apartment", "==", aparment.id),
            orderBy("name", "asc")
          );
          return collectionData(wingsQuery, { idField: "id" }) as Observable<
            IWing[]
          >;
        } else {
          return of([]);
        }
      })
    );
  }

  async addWing(wing, userUid: string) {
    try {
      await addDoc(this.wingsCollection, {
        ...wing,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getWingsByApartmentId(apartmentId: string) {
    const q = query(
      this.wingsCollection,
      where("apartment", "==", apartmentId),
      orderBy("name", "asc")
    );
    const wings = await getDocs(q);
    const returnData = [];
    wings.forEach((wing) => {
      returnData.push({ ...wing.data(), id: wing.id });
    });
    return returnData;
  }

  async getWing(wingId: string) {
    const documentReference = doc(this.wingsCollection, wingId);
    return getDoc(documentReference);
  }

  async updateWing(wing: any, wingId: string, userUid: string) {
    try {
      const documentReference = doc(this.wingsCollection, wingId);
      // prettier-ignore
      updateDoc(documentReference, { ...wing, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteWing(wingId: string) {
    const documentReference = doc(this.wingsCollection, wingId);
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
