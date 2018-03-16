import {GeoLocation} from "../geo-location.model";

export interface NearLocationRequest extends GeoLocation {
  radius: number;
  distanceUnit: string;
}
