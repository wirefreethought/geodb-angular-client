import {FindCollectionRequest} from './find-collection-request.model';

export interface FindCitiesNearCityRequest extends FindCollectionRequest {
  cityId: string;

  minPopulation?: number;
  radius: number;
  distanceUnit: string;
  types?: Array<string>;

  asciiMode?: boolean;
  languageCode?: string;

  sortDirectives?: Array<string>;

  includeDeleted?: string;
}
