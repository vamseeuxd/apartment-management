import { Observable } from "rxjs";
import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MaskitoElementPredicateAsync, MaskitoOptions } from "@maskito/core";
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "@angular/fire/firestore";
import { LoaderService } from "../../../services/loader/loader.service";
import { Auth, User, user } from "@angular/fire/auth";
import { NotificationsService } from "../service";

@Component({
  selector: "add-or-update-page-notifications",
  templateUrl: "add-or-update-page.html",
  styleUrls: ["./add-or-update-page.scss"],
})
export class AddOrUpdateNotificationsPage {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  dataToEdit: any = {
    name: "",
    registrationNumber: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    createdBy: "",
    city: "",
    district: "",
  };
  readonly pinCodeMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  };
  readonly predicate: MaskitoElementPredicateAsync = async (
    el: HTMLIonInputElement
  ) => el.getInputElement();
  constructor(
    public route: ActivatedRoute,
    public loader: LoaderService,
    private router: Router,
    private service: NotificationsService
  ) {
    this.getNotification();
  }

  getNotification() {
    const id = this.loader.show();
    const sub = this.route.params.subscribe(async (params) => {
      sub.unsubscribe();
      if (params && params.id) {
        this.dataToEdit = (
          await this.service.getNotification(this.route.snapshot.params.id)
        ).data();
        console.clear();
        console.log(this.dataToEdit);
        this.loader.hide(id);
      } else {
        this.loader.hide(id);
      }
    });
  }

  async save(notificationForm: NgForm, user: User) {
    if (notificationForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.addNotification(notificationForm.value, user.uid);
        this.loader.hide(id);
        notificationForm.resetForm({});
        this.router.navigate(["/app/tabs/notifications"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
  async update(notificationForm: NgForm, user: User, docId: string) {
    if (notificationForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.updateNotification(notificationForm.value, docId, user.uid);
        this.loader.hide(id);
        notificationForm.resetForm({});
        this.router.navigate(["/app/tabs/notifications"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
}
