import {CountrySummary} from './country-summary.model';

export class CountryDetails extends CountrySummary {
  callingCode: string;
  flagImageUri: string;
  numRegions: number;
}

