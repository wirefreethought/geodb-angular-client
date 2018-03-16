import {FindCollectionRequest} from "./find-collection-request.model";
import {NearLocationRequest} from "./near-location-request.model";

export interface FindCitiesNearCityRequest extends FindCollectionRequest {
  cityId: number;
  minPopulation?: number;
  radius: number;
  distanceUnit: string;
  includeDeleted?: string;
  sortDirectives?: Array<string>;
}
