import { Observable } from "rxjs";
import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "../../../services/loader/loader.service";
import { Auth, User, user } from "@angular/fire/auth";
import { WingsService } from "../service";
import { ApartmentsService } from "../../apartments/service";

@Component({
  selector: "add-or-update-page-wings",
  templateUrl: "add-or-update-page.html",
  styleUrls: ["./add-or-update-page.scss"],
})
export class AddOrUpdateWingsPage {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  dataToEdit: any = {
    name: "",
    description: "",
    apartment: "",
  };
  apartments$: Observable<any[]>;

  constructor(
    public route: ActivatedRoute,
    public loader: LoaderService,
    private router: Router,
    private service: WingsService,
    private apartmentService: ApartmentsService
  ) {
    this.apartments$ = this.apartmentService.apartments$;
    this.getWing();
  }

  getWing() {
    const id = this.loader.show();
    const sub = this.route.params.subscribe(async (params) => {
      sub.unsubscribe();
      if (params && params.id) {
        this.dataToEdit = (
          await this.service.getWing(this.route.snapshot.params.id)
        ).data();
        this.loader.hide(id);
      } else {
        this.loader.hide(id);
      }
    });
  }

  async save(wingForm: NgForm, user: User) {
    if (wingForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.addWing(wingForm.value, user.uid);
        this.loader.hide(id);
        wingForm.resetForm({});
        this.router.navigate(["/app/tabs/wings"]);
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
        this.router.navigate(["/app/tabs/wings"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
}
