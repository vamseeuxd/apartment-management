import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MaskitoElementPredicateAsync, MaskitoOptions } from "@maskito/core";
import { LoaderService } from "../../../services/loader/loader.service";
import { Auth, User, user } from "@angular/fire/auth";
import { ApartmentsService, IApartment } from "../../../services/apartments/apartments.service";

@Component({
  selector: "add-or-update-page-apartments",
  templateUrl: "add-or-update-page.html",
  styleUrls: ["./add-or-update-page.scss"],
})
export class AddOrUpdateApartmentsPage {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  dataToEdit: IApartment = {
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
    id: "",
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
    private service: ApartmentsService
  ) {
    this.getApartment();
  }

  getApartment() {
    const id = this.loader.show();
    const sub = this.route.params.subscribe(async (params) => {
      sub.unsubscribe();
      if (params && params.id) {
        // prettier-ignore
        this.dataToEdit = ( await this.service.getApartment(this.route.snapshot.params.id) ).data();
        this.loader.hide(id);
      } else {
        this.loader.hide(id);
      }
    });
  }

  async save(apartmentForm: NgForm, user: User) {
    if (apartmentForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.addApartment(apartmentForm.value, user.uid);
        this.loader.hide(id);
        apartmentForm.resetForm({});
        this.router.navigate(["/app/tabs/apartments"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
  async update(apartmentForm: NgForm, user: User, docId: string) {
    if (apartmentForm.valid) {
      const id = this.loader.show();
      try {
        // prettier-ignore
        await this.service.updateApartment( apartmentForm.value, docId, user.uid );
        this.loader.hide(id);
        apartmentForm.resetForm({});
        this.router.navigate(["/app/tabs/apartments"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
}
