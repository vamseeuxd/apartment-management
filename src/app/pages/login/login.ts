import { Component, inject } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

import { UserData } from '../../providers/user-data'

import { UserOptions } from '../../interfaces/user-options'
import {
  Auth,
  User,
  user,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth'
import { LoaderService } from '../../services/loader/loader.service'
import { AlertController } from '@ionic/angular'
import { UsersService } from '../../services/users/users.service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' }
  submitted = false
  private auth: Auth = inject(Auth)
  user$ = user(this.auth)

  constructor(
    public userData: UserData,
    public router: Router,
    public loader: LoaderService,
    private alertController: AlertController,
    private usersService: UsersService,
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true

    if (form.valid) {
      this.userData.login(this.login.username)
      this.router.navigateByUrl('/app/tabs/schedule')
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup')
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    const id = this.loader.show()
    try {
      const result = await signInWithPopup(this.auth, provider)
      await this.addUserToDataBase(result.user)
      this.loader.hide(id)
      this.userData.login(result.user.displayName)
      this.router.navigateByUrl('/app/tabs/apartments')
    } catch (error) {
      console.table(error)
      this.loader.hide(id)
    }
  }

  async addUserToDataBase(user: User) {
    const id = this.loader.show()
    try {
      const result = await this.usersService.getUsersByUid(user.uid)
      this.loader.hide(id)
      if (result.data()) {
        this.loader.hide(id)
      } else {
        const uid = user.uid
        const email = user.email
        const displayName = user.displayName
        const photoURL = user.photoURL
        // prettier-ignore
        await this.usersService.addUser( { uid, email, displayName, photoURL, }, uid);
        this.loader.hide(id)
      }
    } catch (error) {
      console.log(error)
      this.loader.hide(id)
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout Confirmation',
      subHeader: 'Are you sure You want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            const id = this.loader.show()
            await signOut(this.auth)
            this.loader.hide(id)
          },
        },
      ],
    })
    await alert.present()
  }
}
