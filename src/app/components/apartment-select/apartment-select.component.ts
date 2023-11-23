import { Component, Input } from "@angular/core";
import {
  ApartmentsService,
  IApartment,
} from "../../services/apartments/apartments.service";
import { ActionSheetController } from "@ionic/angular";

@Component({
  selector: "apartment-select",
  templateUrl: "apartment-select.component.html",
  styleUrls: ["./apartment-select.component.scss"],
})
export class ApartmentSelectComponent {
  @Input() labelFor = "Dashboard for";
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public apartmentsService: ApartmentsService
  ) {
  }

  async presentActionSheet() {
    const buttons = this.apartmentsService.apartments.map((aparment) => {
      return {
        text: aparment.name,
        role:
          this.apartmentsService.selectedApartment?.id === aparment.id
            ? "selected"
            : "destructive",
        data: aparment,
        handler: () => {
          this.apartmentsService.updateSelecteAparment(aparment);
        },
      };
    });
    const actionSheet = await this.actionSheetCtrl.create({
      header: "Select Apartment",
      buttons: [
        ...buttons,
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
