import { AfterViewInit, Component, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController, ToastController } from "@ionic/angular";

import { Auth, user } from "@angular/fire/auth";

@Component({
  selector: "page-account",
  templateUrl: "account.html",
  styleUrls: ["./account.scss"],
})
export class AccountPage {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  private toastController: ToastController = inject(ToastController);

  async copyMessage(val: string, message:string) {
    const selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
    const toast = await this.toastController.create({
      message: `${message} : ${val} copied`,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
