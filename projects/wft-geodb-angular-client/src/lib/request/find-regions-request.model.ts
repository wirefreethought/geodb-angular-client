import {FindCollectionRequest} from './find-collection-request.model';

export interface FindRegionsRequest extends FindCollectionRequest {
  countryId: string;

  namePrefix?: string;
  namePrefixDefaultLangResults?: boolean;

  asciiMode?: boolean;
  languageCode?: string;
}
