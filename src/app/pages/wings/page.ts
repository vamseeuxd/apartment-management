import { switchMap, tap } from "rxjs/operators";
import { from } from "rxjs";
import { Component, inject } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { LoaderService } from "../../services/loader/loader.service";
import { WingsService } from "./service";
import { IApartment } from "../../interfaces/IApartment";
import { ApartmentsByUserService } from "../../services/apartments/ApartmentsServiceByUser";
import { ActivatedRoute } from "@angular/router";
import { ApartmentBase } from "../../base-classes/apartment-base";

@Component({
  selector: "page-wings",
  templateUrl: "page.html",
  styleUrls: ["./page.scss"],
})
export class WingsPage extends ApartmentBase {}
