import { Injectable, inject } from '@angular/core'
import { Auth, User, user } from '@angular/fire/auth'
import {
  CollectionReference,
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
  where,
} from '@angular/fire/firestore'
import { ToastController } from '@ionic/angular'
import {
  Observable,
  Subject,
  forkJoin,
  from,
  map,
  shareReplay,
  switchMap,
} from 'rxjs'
import { IApartment } from '../../interfaces/IApartment'

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  toastController: ToastController = inject(ToastController)
  firestore: Firestore = inject(Firestore)
  auth: Auth = inject(Auth)
  user$: Observable<User> = user(this.auth)
  // prettier-ignore
  apartmentsCollection: CollectionReference<IApartment> = collection(this.firestore, "apartments") as CollectionReference<IApartment>;
  // prettier-ignore
  apartmentsCollectionWithQuery = query( this.apartmentsCollection, orderBy("name", "asc") );
  // prettier-ignore
  apartments$: Observable<IApartment[]> = collectionData(this.apartmentsCollectionWithQuery, { idField: "id" }) as Observable<IApartment[]>;

  apartments: IApartment[] = []
  selectedApartmentAction: Subject<IApartment> = new Subject()
  selectedApartment$ = this.selectedApartmentAction.asObservable()
  selectedApartment: IApartment

  constructor() {
    this.getApartmentDetailsRelatedToUser().subscribe((apartments) => {
      this.apartments = apartments
    })
  }

  async addApartment(apartment: IApartment, userUid: string) {
    try {
      await addDoc(this.apartmentsCollection, {
        ...apartment,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      })
    } catch (error) {
      this.showError(error)
    }
  }

  getApartmentDetailsRelatedToUser(): Observable<IApartment[]> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          const collectionRef: CollectionReference<IApartment> = collection(
            this.firestore,
            'members',
          ) as CollectionReference<any>
          const collectionQueryRef = query(
            collectionRef,
            where('uid', '==', user.uid),
          )
          const collectionDataRef = collectionData(collectionQueryRef, {
            idField: 'id',
          }) as Observable<any[]>
          return collectionDataRef.pipe(
            map((members: any[]) => {
              return members.map((member) => member.apartment)
            }),
          )
        } else {
          return []
        }
      }),
      switchMap((apartmentIds: any[]) => {
        const requests = apartmentIds.map((apartmentId) => {
          // return of(apartmentId);
          return from(this.getApartment(apartmentId)).pipe(
            map((app) => {
              return { ...app.data(), id: apartmentId }
            }),
          )
        })
        return forkJoin(requests)
      }),
      shareReplay(),
    )
  }

  updateSelecteAparment(aparment: IApartment) {
    this.selectedApartmentAction.next(aparment)
    this.selectedApartment = aparment
  }

  async getApartment(apartmentId: string) {
    const documentReference = doc<IApartment>(
      this.apartmentsCollection,
      apartmentId,
    )
    return getDoc(documentReference)
  }

  async updateApartment(apartment: any, apartmentId: string, userUid: string) {
    try {
      const documentReference = doc(this.apartmentsCollection, apartmentId)
      // prettier-ignore
      updateDoc(documentReference, { ...apartment, lastUpdatedOn: serverTimestamp(), lastUpdatedBy: userUid });
    } catch (error) {
      this.showError(error)
    }
  }

  async deleteApartment(apartmentId: string) {
    const documentReference = doc(this.apartmentsCollection, apartmentId)
    try {
      await deleteDoc(documentReference)
    } catch (error) {
      this.showError(error)
    }
  }

  async showError(error: any) {
    // prettier-ignore
    const toast = await this.toastController.create({ message: error.message, duration: 1500, position: "bottom" });
    await toast.present()
  }
}
