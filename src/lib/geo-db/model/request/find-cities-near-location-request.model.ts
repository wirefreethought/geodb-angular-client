import {FindCollectionRequest} from "./find-collection-request.model";
import {NearLocationRequest} from "./near-location-request.model";

export interface FindCitiesNearLocationRequest extends FindCollectionRequest {
  nearLocation?: NearLocationRequest;
  minPopulation?: number;
  namePrefix?: string;
  includeDeleted?: string;
  sortDirectives?: Array<string>;
}
