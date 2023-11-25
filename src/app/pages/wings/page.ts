import { Component, inject } from '@angular/core'
import { WingsService } from './service'
import { ApartmentBase } from '../../base-classes/apartment-base'
import { IApartment } from '../../interfaces/IApartment'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'page-wings',
  templateUrl: 'page.html',
  styleUrls: ['./page.scss'],
})
export class WingsPage extends ApartmentBase {
  service: WingsService = inject(WingsService)
  alertController: AlertController = inject(AlertController)
  apartment: IApartment
  constructor() {
    super()
    this.apartment$.subscribe((apartment) => {
      this.apartment = apartment
      this.service.apartmentAction.next(apartment)
    })
  }

  async deleteItem(slidingItem: HTMLIonItemSlidingElement, wingId: string) {
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
              await this.service.deleteWing(wingId)
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
