
import {IncludeDeletedMode} from "../include-deleted-mode.enum";
import {FindCollectionRequest} from "./find-collection-request.model";

export interface FindRegionCitiesRequest extends FindCollectionRequest {
  countryCode: string;
  regionCode: string;
  minPopulation?: number;
  includeDeleted?: IncludeDeletedMode;
}
