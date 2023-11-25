import { Observable, combineLatest } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Component } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { LoaderService } from '../../services/loader/loader.service'
import { MembersService, IMember } from './service'
import { UsersService } from '../../services/users/users.service'
import { ApartmentsService } from '../../services/apartments/apartments.service'

@Component({
  selector: 'page-members',
  templateUrl: 'page.html',
  styleUrls: ['./page.scss'],
})
export class MembersPage {
  members$: Observable<IMember[]>
  membersWithApartmentAndUserDetail$: Observable<any>
  constructor(
    private alertController: AlertController,
    public loader: LoaderService,
    private apartmentService: ApartmentsService,
    private usersService: UsersService,
    private service: MembersService,
  ) {
    this.getMembersWithApartmentAndUserDetail()
  }

  getMembersWithApartmentAndUserDetail() {
    const id = this.loader.show()
    this.membersWithApartmentAndUserDetail$ = combineLatest([
      this.apartmentService.apartments$,
      this.usersService.users$,
      this.service.members$,
    ]).pipe(
      map(([apartments, users, members]) => {
        const returnValue = []
        apartments.forEach((apartment) => {
          const groupedApartment = {
            ...apartment,
            users: members
              .filter((member) => member.apartment === apartment.id)
              .map((member) => {
                const user = users.find((user) => {
                  return user.uid === member.uid
                })
                return user ? { ...user, member } : null
              })
              .filter((user) => !!user),
          }
          returnValue.push(groupedApartment)
        })
        return returnValue
      }),
      tap((x) => {
        this.loader.hide(id)
      }),
    )
  }

  // prettier-ignore
  async deleteItem( slidingItem: HTMLIonItemSlidingElement, memberId: string ) {
    await slidingItem.close();
    const alert = await this.alertController.create(
      {
        header: "Delete Confirmation", subHeader: "Are you sure! Do you want to delete?",
        buttons: [
          {
            text: "Yes",
            handler: async () => {
              const id = this.loader.show();
              try {
                await this.service.deleteMember(memberId);
                this.loader.hide(id);
              } catch (error) {
                this.loader.hide(id);
              }
            },
          },
          "No",
        ],
    });
    await alert.present();
  }
  getAddressString(member: IMember) {
    const { uid, apartment } = member
    return Object.values({
      UID: `${uid}`,
      apartment: `${apartment}`,
    })
      .filter((val) => !!val)
      .join(', ')
    // .join("<br>");
  }
}
