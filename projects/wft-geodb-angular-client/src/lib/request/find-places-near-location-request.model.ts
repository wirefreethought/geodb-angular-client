import {FindCollectionRequest} from './find-collection-request.model';
import {NearLocationRequest} from './near-location-request.model';

export interface FindPlacesNearLocationRequest extends FindCollectionRequest {
  location: NearLocationRequest;

  minPopulation?: number;
  maxPopulation?: number;

  namePrefix?: string;
  namePrefixDefaultLangResults?: boolean;

  types?: Array<string>;

  asciiMode?: boolean;
  languageCode?: string;

  sortDirectives?: Array<string>;

  includeDeleted?: string;
}
