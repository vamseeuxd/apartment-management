import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MaskitoElementPredicateAsync, MaskitoOptions } from "@maskito/core";
import { LoaderService } from "../../../services/loader/loader.service";
import { Auth, User, user } from "@angular/fire/auth";
import { MembersService, IMember } from "../service";
import { Observable } from "rxjs";
import { ApartmentsService, IApartment } from "../../apartments/service";

@Component({
  selector: "add-or-update-page-members",
  templateUrl: "add-or-update-page.html",
  styleUrls: ["./add-or-update-page.scss"],
})
export class AddOrUpdateMembersPage {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  dataToEdit: IMember = {
    uid: "",
    apartment: "",
    id: ""
  };
  readonly pinCodeMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  };
  readonly predicate: MaskitoElementPredicateAsync = async (
    el: HTMLIonInputElement
  ) => el.getInputElement();

  apartments$: Observable<IApartment[]>;

  constructor(
    public route: ActivatedRoute,
    public loader: LoaderService,
    private router: Router,
    private service: MembersService,
    private apartmentService: ApartmentsService
  ) {
    this.apartments$ = this.apartmentService.apartments$;
    this.getMember();
  }

  getMember() {
    const id = this.loader.show();
    const sub = this.route.params.subscribe(async (params) => {
      sub.unsubscribe();
      if (params && params.id) {
        // prettier-ignore
        this.dataToEdit = ( await this.service.getMember(this.route.snapshot.params.id) ).data();
        this.loader.hide(id);
      } else {
        this.loader.hide(id);
      }
    });
  }

  async save(memberForm: NgForm, user: User) {
    if (memberForm.valid) {
      const id = this.loader.show();
      try {
        await this.service.addMember(memberForm.value, user.uid);
        this.loader.hide(id);
        memberForm.resetForm({});
        this.router.navigate(["/app/tabs/members"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
  async update(memberForm: NgForm, user: User, docId: string) {
    if (memberForm.valid) {
      const id = this.loader.show();
      try {
        // prettier-ignore
        await this.service.updateMember( memberForm.value, docId, user.uid );
        this.loader.hide(id);
        memberForm.resetForm({});
        this.router.navigate(["/app/tabs/members"]);
      } catch (error) {
        console.log(error.code);
        this.loader.hide(id);
      }
    }
  }
}
