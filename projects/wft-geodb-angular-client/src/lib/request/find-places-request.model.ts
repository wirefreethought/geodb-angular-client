import {FindCollectionRequest} from './find-collection-request.model';

export interface FindPlacesRequest extends FindCollectionRequest {
  countryIds?: Array<string>;
  excludedCountryIds?: Array<string>;

  minPopulation?: number;
  maxPopulation?: number;

  namePrefix?: string;
  namePrefixDefaultLangResults?: boolean;

  timeZoneIds?: Array<string>;
  types?: Array<string>;

  asciiMode?: boolean;
  languageCode?: string;

  sortDirectives?: Array<string>;

  includeDeleted?: string;
}
