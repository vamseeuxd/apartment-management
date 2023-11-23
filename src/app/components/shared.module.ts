import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ApartmentSelectComponent } from "./apartment-select/apartment-select.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [ApartmentSelectComponent],
  exports: [ApartmentSelectComponent],
})
export class SharedModule {}
