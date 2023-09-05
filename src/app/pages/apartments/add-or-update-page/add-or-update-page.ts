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

@Component({
  selector: "add-or-update-page-apartments",
  templateUrl: "add-or-update-page.html",
  styleUrls: ["./add-or-update-page.scss"],
})
export class AddOrUpdateApartmentsPage {
  apartments$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  apartmentsCollection: CollectionReference;
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  documentReference: DocumentReference;
  dataToEdit: any = {
    name: "",
    registrationNumber: "",
    pincode: "",
    addressLine1: "",
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
    private router: Router
  ) {
    this.apartmentsCollection = collection(this.firestore, "apartments");
    this.apartments$ = collectionData(this.apartmentsCollection) as Observable<
      any[]
    >;
    const id = this.loader.show();
    const sub = this.route.params.subscribe((params) => {
      sub.unsubscribe();
      if (params && params.id) {
        this.documentReference = doc(
          this.apartmentsCollection,
          route.snapshot.params.id
        );
        getDoc(this.documentReference)
          .then((val) => {
            this.dataToEdit = val.data();
            this.loader.hide(id);
          })
          .catch((error) => {
            this.loader.hide(id);
          });
      } else {
        this.loader.hide(id);
      }
    });
  }
  async save(apartmentForm: NgForm, user: User) {
    if (apartmentForm.valid) {
      const id = this.loader.show();
      try {
        await addDoc(this.apartmentsCollection, {
          ...apartmentForm.value,
          createdOn: serverTimestamp(),
          createdBy: user.uid,
        });
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
        updateDoc(this.documentReference, {
          ...apartmentForm.value,
          lastUpdatedOn: serverTimestamp(),
          lastUpdatedBy: user.uid,
        });
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
