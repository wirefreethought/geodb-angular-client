import {FindCollectionRequest} from "./find-collection-request.model";

export interface FindRegionCitiesRequest extends FindCollectionRequest {
  countryCode: string;
  regionCode: string;
  minPopulation?: number;
  includeDeleted?: string;
  sortDirectives?: Array<string>;
}
