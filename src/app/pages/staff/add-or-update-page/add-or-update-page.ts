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
import { StaffsService } from "../service";

@Component({
  selector: "add-or-update-page-staffs",
  templateUrl: "add-or-update-page.html",
  styleUrls: ["./add-or-update-page.scss"],
})
export class AddOrUpdateStaffsPage {
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
    private service: StaffsService
  ) {
    this.getStaff();
  }

  getStaff() {
    const id = this.loader.show();
    const sub = this.route.params.subscribe(async (params) => {
      sub.unsubscribe();
      if (params && params.id) {
        this.dataToEdit = (
          await this.service.getStaff(this.route.snapshot.params.id)
        ).data();
        console.clear();
        console.log(this.dataToEdit);
        this.loader.hide(id);
      } else {
        this.loader.hide(id);
      }
    });
  }

  async save(staffForm: NgForm, user: User) {
    if (staffForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.addStaff(staffForm.value, user.uid);
        this.loader.hide(id);
        staffForm.resetForm({});
        this.router.navigate(["/app/tabs/staffs"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
  async update(staffForm: NgForm, user: User, docId: string) {
    if (staffForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.updateStaff(staffForm.value, docId, user.uid);
        this.loader.hide(id);
        staffForm.resetForm({});
        this.router.navigate(["/app/tabs/staffs"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
}
