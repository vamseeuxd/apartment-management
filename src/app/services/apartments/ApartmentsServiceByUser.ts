import { switchMap, map, Observable, firstValueFrom } from "rxjs";
import { NgZone } from "@angular/core";
// @ts-ignore
// import { switchMap, map } from "rxjs/operators";
import { Injectable, inject } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { documentId, serverTimestamp } from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { IApartment } from "../../interfaces/IApartment";
import { IMember } from "../../pages/members/service";

@Injectable({
  providedIn: "root",
})
export class ApartmentsByUserService {
  // This is used to show Error
  toastController: ToastController = inject(ToastController);
  private afs: AngularFirestore = inject(AngularFirestore);
  private afAuth: AngularFireAuth = inject(AngularFireAuth);
  public apartments$: Observable<IApartment[]> = this.afAuth.authState.pipe(
    switchMap((user: any) =>
      this.afs
        .collection<any>("members", (ref) => {
          return ref.where("uid", "==", user.uid);
        })
        .valueChanges()
    ),
    map((memberShips: any[]) => memberShips.map((d) => d.apartment)),
    switchMap((apartmentIds: string[]) =>
      this.afs
        .collection<IApartment>("apartments", (ref) =>
          ref.where(documentId(), "in", apartmentIds)
        )
        .valueChanges({ idField: "id" })
    )
  );

  constructor() {}

  async deleteApartment(apartmentId: string) {
    try {
      await this.afs
        .collection<IApartment>("apartments")
        .doc(apartmentId)
        .delete();
    } catch (error) {
      this.showError(error);
    }
  }

  async showError(error: any) {
    // prettier-ignore
    const toast = await this.toastController.create({ message: error.message, duration: 1500, position: "bottom" });
    await toast.present();
  }

  async getApartment(apartmentId: string) {
    return firstValueFrom(
      this.afs
        .collection<IApartment>("apartments")
        .doc(apartmentId)
        .valueChanges({ idField: "id" })
    );
  }

  async addApartment(apartment: IApartment, userUid: string) {
    try {
      const newDoc = await this.afs.collection<IApartment>("apartments").add({
        ...apartment,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
      const memberDetails: IMember = {
        uid: userUid,
        apartment: newDoc.id,
      };
      console.log("memberDetails", memberDetails);
      await this.afs.collection<IMember>("members").add({
        ...memberDetails,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async updateApartment(apartment: any, apartmentId: string, userUid: string) {
    try {
      const doc = await this.afs
        .collection<IApartment>("apartments")
        .doc(apartmentId);
      await doc.update({
        ...apartment,
        lastUpdatedOn: serverTimestamp(),
        lastUpdatedBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }
}
