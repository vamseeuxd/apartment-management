import { IFireBaseTimeStamp } from "./IFireBaseTimeStamp";

export interface IFlat {
  floor: number;
  lastUpdatedBy: string;
  createdOn: IFireBaseTimeStamp;
  lastUpdatedOn: IFireBaseTimeStamp;
  wing: string;
  createdBy: string;
  description: string;
  name: string;
  apartment: string;
  id: string;
}
