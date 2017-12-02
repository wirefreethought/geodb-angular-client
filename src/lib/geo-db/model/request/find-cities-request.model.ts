import {FindCollectionRequest} from "./find-collection-request.model";
import {NearLocationRequest} from "./near-location-request.model";

export interface FindCitiesRequest extends FindCollectionRequest {
  namePrefix?: string;
  countryCodes?: Array<string>;
  excludedCountryCodes?: Array<string>;
  minPopulation?: number;
  nearLocation?: NearLocationRequest;
  timeZoneIds?:Array<string>;
  includeDeleted?: string;
}
