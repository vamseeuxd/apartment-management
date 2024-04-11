import { IFireBaseTimeStamp } from "./IFireBaseTimeStamp";

export interface IApartment {
  district: string;
  city: string;
  state: string;
  pincode: string;
  addressLine2: string;
  createdBy: string;
  addressLine1: string;
  name: string;
  createdOn: IFireBaseTimeStamp;
  lastUpdatedOn: IFireBaseTimeStamp;
  country: string;
  registrationNumber: string;
  id: string;
}
