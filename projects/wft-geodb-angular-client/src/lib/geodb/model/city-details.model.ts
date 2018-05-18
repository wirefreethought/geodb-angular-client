import {CitySummary} from './city-summary.model';

export class CityDetails extends CitySummary {
  deleted: boolean;
  elevationMeters: number;
  population: number;
  timezone: string;
}
