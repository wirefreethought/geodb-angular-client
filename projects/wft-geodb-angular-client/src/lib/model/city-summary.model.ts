export class CitySummary {
  id: string;
  wikiDataId: string;

  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  region: string;
  regionCode: string;

  // Only included if the result of a location-constrained request
  distance: number;

  get displayName(): string {
    return this.region != null && this.region.trim().length > 0
      ? this.city + ', ' + this.region + ', ' + this.country
      : this.city + ', ' + this.country;
  }
}
