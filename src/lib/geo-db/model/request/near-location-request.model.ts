import {GeoLocation} from "../geo-location.model";
import {LengthUnit} from "../length-unit.enum";

export interface NearLocationRequest extends GeoLocation {
  radius: number;
  radiusUnit: LengthUnit;
}
