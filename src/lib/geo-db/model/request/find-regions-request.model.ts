import {FindCollectionRequest} from "./find-collection-request.model";

export interface FindRegionsRequest extends FindCollectionRequest {
  countryCode: string;
  namePrefix?: string;
}
