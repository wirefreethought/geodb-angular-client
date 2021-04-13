import {PlaceSummary} from './place-summary.model';

export class PlaceDetails extends PlaceSummary {
  deleted: boolean;
  elevationMeters: number;
  timezone: string;
}
