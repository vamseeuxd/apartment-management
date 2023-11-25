import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

import { UserData } from '../../providers/user-data'

import { UserOptions } from '../../interfaces/user-options'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' }
  submitted = false

  constructor(
    public router: Router,
    public userData: UserData,
    public authService: AuthService,
  ) {}

  async onSignup(form: NgForm) {
    this.authService.SignUp(form.value.username, form.value.password)
    /* this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    } */
  }
}
