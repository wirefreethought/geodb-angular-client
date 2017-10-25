import {FindCollectionRequest} from "./find-collection-request.model";
import {NearLocationRequest} from "./near-location-request.model";

export interface FindNearbyCitiesRequest extends FindCollectionRequest {
  cityId: number;
  minPopulation?: number;
  nearLocationRadius: number;
  nearLocationRadiusUnit: string;
  includeDeleted?: string;
}
