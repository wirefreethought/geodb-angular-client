import {FindCollectionRequest} from './find-collection-request.model';

export interface FindRegionPlacesRequest extends FindCollectionRequest {
  countryId: string;
  regionId: string;

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
