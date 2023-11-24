import { Injectable, inject } from "@angular/core";
import { serverTimestamp } from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { Observable, switchMap, firstValueFrom, Subject } from "rxjs";
import { IFirestoreTime } from "../../interfaces/firestoreTime";
import { IFlat } from "../flats/service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { IApartment } from "../../interfaces/IApartment";

export interface IWing {
  id: string;
  apartment: string;
  name: string;
  createdBy: string;
  noOfFloors: number;
  description: string;
  createdOn: IFirestoreTime;
  flats?: IFlat[];
}

@Injectable({
  providedIn: "root",
})
export class WingsService {
  toastController: ToastController = inject(ToastController);
  private afs: AngularFirestore = inject(AngularFirestore);
  apartmentAction: Subject<IApartment> = new Subject<IApartment>();
  apartment$: Observable<IApartment> = this.apartmentAction.asObservable();
  public wings$: Observable<IWing[]> = this.apartment$.pipe(
    switchMap((apartment: any) => {
      return this.afs
        .collection<any>("wings", (ref) => {
          return ref.where("apartment", "==", apartment.id);
        })
        .valueChanges({ idField: "id" });
    })
  );

  async addWing(wing, userUid: string) {
    try {
      const newDoc = await this.afs.collection<IWing>("wings").add({
        ...wing,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getWing(wingId: string) {
    return firstValueFrom(
      this.afs
        .collection<IWing>("wings")
        .doc(wingId)
        .valueChanges({ idField: "id" })
    );
  }

  async updateWing(wing: any, wingId: string, userUid: string) {
    try {
      const doc = await this.afs.collection<IWing>("wings").doc(wingId);
      await doc.update({
        ...wing,
        lastUpdatedOn: serverTimestamp(),
        lastUpdatedBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteWing(wingId: string) {
    try {
      await this.afs.collection<IWing>("wings").doc(wingId).delete();
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
