import { Observable } from "rxjs";
import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoaderService } from "../../services/loader/loader.service";
import { MembersService } from "./service";

@Component({
  selector: "page-members",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class MembersPage {
  members$: Observable<any[]>;
  constructor(
    private alertController: AlertController,
    public loader: LoaderService,
    private service: MembersService
  ) {
    this.members$ = this.service.members$;
  }

  // prettier-ignore
  async deleteItem( slidingItem: HTMLIonItemSlidingElement, apartmentId: string ) {
    await slidingItem.close();
    const alert = await this.alertController.create(
      {
        header: "Delete Confirmation", subHeader: "Are you sure! Do you want to delete?",
        buttons: [
          {
            text: "Yes",
            handler: async () => {
              const id = this.loader.show();
              try {
                await this.service.deleteMember(apartmentId);
                this.loader.hide(id);
              } catch (error) {
                this.loader.hide(id);
              }
            },
          },
          "No",
        ],
    });
    await alert.present();
  }
  getAddressString(member: any) {
    const {
      addressLine1,
      addressLine2,
      city,
      district,
      state,
      country,
      pincode,
    } = member;
    return Object.values({
      addressLine1: `${addressLine1}`,
      addressLine2: addressLine2 ? `${addressLine2}` : null,
      city: `${city}`,
      district: `${district}`,
      state: `${state}`,
      country: `${country}`,
      pincode: `${pincode}`,
    })
      .filter((val) => !!val)
      .join(", ");
    // .join("<br>");
  }
}
