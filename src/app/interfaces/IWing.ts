import { IFireBaseTimeStamp } from "./IFireBaseTimeStamp";

export interface IWing {
  name: string;
  lastUpdatedOn: IFireBaseTimeStamp;
  description: string;
  createdBy: string;
  createdOn: IFireBaseTimeStamp;
  lastUpdatedBy: string;
  apartment: string;
  noOfFloors: number;
  id: string;
}
