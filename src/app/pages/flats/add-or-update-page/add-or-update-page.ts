import { Observable } from "rxjs";
import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "../../../services/loader/loader.service";
import { Auth, User, user } from "@angular/fire/auth";
import { FlatsService } from "../service";
import { ApartmentsService } from "../../apartments/service";
import { WingsService } from "../../wings/service";
import { IonInput } from "@ionic/angular";
import { IFlat } from "../../../interfaces/IFlat";

@Component({
  selector: "add-or-update-page-flats",
  templateUrl: "add-or-update-page.html",
  styleUrls: ["./add-or-update-page.scss"],
})
export class AddOrUpdateFlatsPage {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  dataToEdit: IFlat = {
    name: "",
    description: "",
    apartment: "",
    wing: "",
    floor: null,
    createdBy: "",
    createdOn: {
      nanoseconds: 0,
      seconds: 0,
    },
    lastUpdatedBy: "",
    lastUpdatedOn: undefined,
    id: ""
  };
  apartments$: Observable<any[]>;
  wings: any[] = [];
  floors: number[];

  constructor(
    public route: ActivatedRoute,
    public loader: LoaderService,
    private router: Router,
    private service: FlatsService,
    private apartmentService: ApartmentsService,
    private wingsService: WingsService
  ) {
    this.apartments$ = this.apartmentService.apartments$;
    this.getFlat();
  }

  getFlat() {
    const id = this.loader.show();
    const sub = this.route.params.subscribe(async (params) => {
      sub.unsubscribe();
      if (params && params.id) {
        this.dataToEdit = (
          await this.service.getFlat(this.route.snapshot.params.id)
        ).data() as IFlat;
        this.onAparmentChange({ detail: { value: this.dataToEdit.apartment } });
        this.loader.hide(id);
      } else {
        this.loader.hide(id);
      }
    });
  }

  async onAparmentChange($event: any) {
    const id = this.loader.show();
    this.wings = await this.wingsService.getWingsByApartmentId(
      $event.detail.value
    );
    this.onWingChange({ detail: { value: this.dataToEdit.wing } });
    this.loader.hide(id);
  }

  async onWingChange($event: any) {
    console.log($event.detail.value);
    // prettier-ignore
    const selectedWing = this.wings.find((wing) => wing.id == $event.detail.value);
    if (selectedWing) {
      // prettier-ignore
      this.floors = Array.from(Array(selectedWing.noOfFloors).keys()).map( (key) => key + 1 );
    }
  }

  async save(
    flatForm: NgForm,
    user: User,
    addNew: boolean,
    floorNameRef: IonInput
  ) {
    if (flatForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.addFlat(flatForm.value, user.uid);
        this.loader.hide(id);
        if (addNew) {
          this.dataToEdit.name = "";
          this.dataToEdit.description = "";
          this.dataToEdit.wing = flatForm.value.wing;
          this.dataToEdit.floor = flatForm.value.floor;
          this.dataToEdit.apartment = flatForm.value.apartment;
          flatForm.resetForm(this.dataToEdit);
          floorNameRef.setFocus();
        } else {
          this.router.navigate(["/app/tabs/flats"]);
          flatForm.resetForm({});
        }
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
  async update(flatForm: NgForm, user: User, docId: string) {
    if (flatForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.updateFlat(flatForm.value, docId, user.uid);
        this.loader.hide(id);
        flatForm.resetForm({});
        this.router.navigate(["/app/tabs/flats"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
}
