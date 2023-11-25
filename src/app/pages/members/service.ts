import { Injectable, inject } from '@angular/core'
import { FieldValue, serverTimestamp } from '@angular/fire/firestore'
import { ToastController } from '@ionic/angular'
import {
  Observable,
  Subject,
  switchMap,
  firstValueFrom,
  tap,
  combineLatest,
  map,
} from 'rxjs'
import { IFirestoreTime } from '../../interfaces/firestoreTime'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { IApartment } from '../../interfaces/IApartment'
import { IUser } from '../../services/users/users.service'

export enum MEMBER_ROLES {
  ADMIN = 'ADMIN',
  FLAT_OWNER = 'OWNER',
  TENANT = 'TENANT',
  STAFF = 'STAFF',
}
export interface IMember {
  id?: string
  uid: string
  userDetails?: IUser
  apartment: string
  roles: MEMBER_ROLES[]
  lastUpdatedOn?: IFirestoreTime
  createdOn?: FieldValue
  lastUpdatedBy?: string
  createdBy?: string
}

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  toastController: ToastController = inject(ToastController)
  private afs: AngularFirestore = inject(AngularFirestore)
  apartmentAction: Subject<IApartment> = new Subject<IApartment>()
  apartment$: Observable<IApartment> = this.apartmentAction.asObservable()
  public members$: Observable<IMember[]> = this.apartment$.pipe(
    switchMap((apartment: any) => {
      return this.afs
        .collection<any>('members', (ref) => {
          return ref.where('apartment', '==', apartment.id)
        })
        .valueChanges({ idField: 'id' })
        .pipe(
          switchMap((members) => {
            return combineLatest(
              members.map((member) => {
                return this.afs
                  .collection<IUser>('users')
                  .doc(member.uid)
                  .valueChanges({ idField: 'id' })
              }),
            ).pipe(
              map((users) => {
                return members.map((member) => {
                  const userDetails = users.find(
                    (user) => member.uid === user.uid,
                  )
                  return { ...member, userDetails }
                })
              }),
            )
          }),
        )
    }),
  )

  async addMember(member, userUid: string) {
    try {
      await this.afs.collection<IMember>('members').add({
        ...member,
        createdOn: serverTimestamp(),
        createdBy: userUid,
      })
    } catch (error) {
      this.showError(error)
    }
  }

  async getMember(memberId: string) {
    return firstValueFrom(
      this.afs
        .collection<IMember>('members')
        .doc(memberId)
        .valueChanges({ idField: 'id' }),
    )
  }

  async updateMember(member: any, memberId: string, userUid: string) {
    try {
      const doc = await this.afs.collection<IMember>('members').doc(memberId)
      await doc.update({
        ...member,
        lastUpdatedOn: serverTimestamp(),
        lastUpdatedBy: userUid,
      })
    } catch (error) {
      this.showError(error)
    }
  }

  async deleteMember(memberId: string) {
    try {
      await this.afs.collection<IMember>('members').doc(memberId).delete()
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
