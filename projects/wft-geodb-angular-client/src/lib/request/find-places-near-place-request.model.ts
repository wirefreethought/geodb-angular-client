import {FindCollectionRequest} from './find-collection-request.model';

export interface FindPlacesNearPlaceRequest extends FindCollectionRequest {
  placeId: string;

  minPopulation?: number;
  maxPopulation?: number;

  namePrefix?: string;
  namePrefixDefaultLangResults?: boolean;

  radius: number;
  distanceUnit: string;
  types?: Array<string>;

  asciiMode?: boolean;
  languageCode?: string;

  sortDirectives?: Array<string>;

  includeDeleted?: string;
}
