export class PlaceSummary {
  type: string;

  id: string;
  wikiDataId: string;

  country: string;
  countryCode: string;

  region: string;
  regionCode: string;
  regionWdId: string;

  latitude: number;
  longitude: number;

  name: string;
  population: number;

  // Only included if the result of a location-constrained request
  distance: number;

  get displayName(): string {
    return this.region != null && this.region.trim().length > 0
      ? this.name + ', ' + this.region + ', ' + this.country
      : this.name + ', ' + this.country;
  }
}
