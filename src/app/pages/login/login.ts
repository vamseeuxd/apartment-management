import { Component, OnDestroy, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserData } from "../../providers/user-data";

import { UserOptions } from "../../interfaces/user-options";
import {
  Auth,
  User,
  user,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "@angular/fire/auth";
import { Subscription } from "rxjs";
import { LoaderService } from "../../services/loader/loader.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"],
})
export class LoginPage {
  login: UserOptions = { username: "", password: "" };
  submitted = false;
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  constructor(
    public userData: UserData,
    public router: Router,
    public loader: LoaderService,
    private alertController: AlertController
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl("apartments");
    }
  }

  onSignup() {
    this.router.navigateByUrl("/signup");
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const id = this.loader.show();
    try {
      const result = await signInWithPopup(this.auth, provider);
      this.loader.hide(id);
      console.log(result);
      this.userData.login(result.user.displayName);
      // this.router.navigateByUrl("/app/tabs/dashboard");
      this.router.navigateByUrl("apartments");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      console.table(error);
      this.loader.hide(id);
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: "Logout Confirmation",
      subHeader: "Are you sure You want to logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: async () => {
            const id = this.loader.show();
            await signOut(this.auth);
            this.loader.hide(id);
          },
        },
      ],
    });
    await alert.present();
  }
}
