import { Component, inject } from '@angular/core'

import { ToastController } from '@ionic/angular'

import { Auth, User, user } from '@angular/fire/auth'

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage {
  private auth: Auth = inject(Auth)
  user$ = user(this.auth)
  private toastController: ToastController = inject(ToastController)

  async copyMessage(val: string, message: string) {
    const selBox = document.createElement('textarea')
    selBox.style.position = 'fixed'
    selBox.style.left = '0'
    selBox.style.top = '0'
    selBox.style.opacity = '0'
    selBox.value = val
    document.body.appendChild(selBox)
    selBox.focus()
    selBox.select()
    document.execCommand('copy')
    document.body.removeChild(selBox)
    const toast = await this.toastController.create({
      message: `${message} : ${val} copied`,
      duration: 1500,
      position: 'bottom',
    })
    await toast.present()
  }

  getQrData(user: User) {
    return JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
    })
    // return user.uid;
  }
}
