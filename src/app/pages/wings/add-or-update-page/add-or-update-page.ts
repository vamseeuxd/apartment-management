import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "../../../services/loader/loader.service";
import { Auth, User, user } from "@angular/fire/auth";
import { IWing, WingsService } from "../service";
import { IonInput } from "@ionic/angular";
import { ApartmentBase } from "../../../base-classes/apartment-base";
import { IApartment } from "../../../interfaces/IApartment";

@Component({
  selector: "add-or-update-page-wings",
  templateUrl: "add-or-update-page.html",
  styleUrls: ["./add-or-update-page.scss"],
})
export class AddOrUpdateWingsPage extends ApartmentBase {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  dataToEdit: IWing = {
    id: "",
    name: "",
    noOfFloors: 1,
    description: "",
    apartment: "",
    createdBy: "",
    createdOn: {
      nanoseconds: 0,
      seconds: 0,
    },
  };
  apartment: IApartment;
  constructor(
    public loader: LoaderService,
    private router: Router,
    private service: WingsService
  ) {
    super();
    this.apartment$.subscribe((apartment) => {
      this.apartment = apartment;
      this.service.apartmentAction.next(apartment);
      this.getWing();
    });
  }

  getWing() {
    this.activatedRoute.params.subscribe(async (params) => {
      const loaderId = this.loader.show();
      const wingId = params.id;
      this.dataToEdit = await this.service.getWing(wingId);
      this.loader.hide(loaderId);
    });
  }

  async save(
    wingForm: NgForm,
    user: User,
    addNew: boolean,
    wingNameRef: IonInput
  ) {
    if (wingForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.addWing(wingForm.value, user.uid);
        this.loader.hide(id);
        if (addNew) {
          this.dataToEdit.name = "";
          this.dataToEdit.description = "";
          this.dataToEdit.noOfFloors = 1;
          this.dataToEdit.apartment = wingForm.value.apartment;
          wingForm.resetForm(this.dataToEdit);
          wingNameRef.setFocus();
        } else {
          this.router.navigate(["/app/tabs/wings", this.apartment.id]);
          wingForm.resetForm({});
        }
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
  async update(wingForm: NgForm, user: User, docId: string) {
    if (wingForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.updateWing(wingForm.value, docId, user.uid);
        this.loader.hide(id);
        wingForm.resetForm({});
        this.router.navigate(["/app/tabs/wings", this.apartment.id]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
}
