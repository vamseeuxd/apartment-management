import { Component, inject } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { ApartmentBase } from '../../base-classes/apartment-base'
import { MembersService } from './service'
import { IApartment } from '../../interfaces/IApartment'

@Component({
  selector: 'page-members',
  templateUrl: 'page.html',
  styleUrls: ['./page.scss'],
})
export class MembersPage extends  ApartmentBase {
  service: MembersService = inject(MembersService)
  alertController: AlertController = inject(AlertController)
  apartment: IApartment
  constructor() {
    super()
    this.apartment$.subscribe((apartment) => {
      this.apartment = apartment
      this.service.apartmentAction.next(apartment)
    })
  }

  async deleteItem(slidingItem: HTMLIonItemSlidingElement, memberId: string) {
    await slidingItem.close()
    const alert = await this.alertController.create({
      header: 'Delete Confirmation',
      subHeader: 'Are you sure! Do you want to delete?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            const id = this.loader.show()
            try {
              await this.service.deleteMember(memberId)
              this.loader.hide(id)
            } catch (error) {
              this.loader.hide(id)
            }
          },
        },
        'No',
      ],
    })
    await alert.present()
  }
}
