import { FieldValue } from "@angular/fire/firestore";
import { IFirestoreTime } from "./firestoreTime";


export interface IApartment {
  id: string;
  name: string;
  registrationNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
  lastUpdatedOn?: IFirestoreTime;
  createdOn?: FieldValue;
  lastUpdatedBy?: string;
  createdBy?: string;
}
