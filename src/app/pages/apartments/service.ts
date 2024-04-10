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
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { ToastController } from "@ionic/angular";
import { BehaviorSubject, Observable, Subject, map, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApartmentsService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.seletedApartment$.pipe(
      map((seletedApartment) => !!seletedApartment),
      tap((x) => {
        if (!x) {
          this.route.navigate(["/apartments"]);
        }
      })
    );
  }
  toastController: ToastController = inject(ToastController);
  firestore: Firestore = inject(Firestore);
  apartmentsCollection = collection(this.firestore, "apartments");
  apartmentsCollectionWithQuery = query(
    this.apartmentsCollection,
    orderBy("name", "asc")
  );
  // prettier-ignore
  apartments$: Observable<any[]> = collectionData(this.apartmentsCollectionWithQuery, { idField: "id" }) as Observable<any[]>;
  auth: Auth = inject(Auth);
  user$ = user(this.auth);
  seletedApartment: BehaviorSubject<string> = new BehaviorSubject("");
  seletedApartment$ = this.seletedApartment.asObservable();

  constructor(public route: Router) {}

  async addApartment(apartment, userUid: string) {
    try {
      await addDoc(this.apartmentsCollection, {
        ...apartment,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      });
    } catch (error) {
      this.showError(error);
    }
  }

  async getApartment(apartmentId: string) {
    const documentReference = doc(this.apartmentsCollection, apartmentId);
    return getDoc(documentReference);
  }

  async updateApartment(apartment: any, apartmentId: string, userUid: string) {
    try {
      const documentReference = doc(this.apartmentsCollection, apartmentId);
      // prettier-ignore
      updateDoc(documentReference, { ...apartment, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error);
    }
  }

  async deleteApartment(apartmentId: string) {
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
