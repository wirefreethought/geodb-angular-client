import {Observable} from "rxjs/Observable";
import "rxjs/Rx";

import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {CityDetails} from "./model/city-details.model";
import {CitySummary} from "./model/city-summary.model";
import {CountrySummary} from "./model/country-summary.model";
import {GeoResponse} from "./model/geo-response.model";
import {NearLocationRequest} from "./model/near-location.request";
import {RegionSummary} from "./model/region-summary.model";

import {GeoDbConfig} from "./model/geodb-config.model";
import {CountryDetails} from "./model/country-details.model";
import {RegionDetails} from "./model/region-details.model";
import {Currency} from "./model/currency.model";
import {Locale} from "./model/locale.model";

@Injectable()
export class GeoDbService {
  private citiesEndpoint: string;
  private countriesEndpoint: string;
  private currenciesEndpoint: string;
  private localesEndpoint: string;

  constructor(private httpClient: HttpClient, private config: GeoDbConfig) {
    this.citiesEndpoint = config.serviceUri + "/v1/geo/cities";
    this.countriesEndpoint = config.serviceUri + "/v1/geo/countries";
    this.currenciesEndpoint = config.serviceUri + "/v1/locale/currencies";
    this.localesEndpoint = config.serviceUri + "/v1/locale/locales";
  }

  findCityById(id: number): Observable<GeoResponse<CityDetails>> {
    const endpoint = this.citiesEndpoint + "/" + id;

    return this.httpClient.get<GeoResponse<CityDetails>>(endpoint);
  }

  findCities(
    namePrefix: string,
    countryCode: string,
    minCityPopulation: number,
    limit: number,
    offset: number): Observable<GeoResponse<CitySummary[]>> {

    let params: HttpParams = this.buildPagingParams(limit, offset);

    if (namePrefix) {
      params = params.set("namePrefix", namePrefix);
    }

    if (countryCode) {
      params = params.set("countryCode", countryCode);
    }

    if (minCityPopulation) {
      params = params.set("minPopulation", "" + minCityPopulation);
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      this.citiesEndpoint,
      {
        params: params
      }
    );
  }

  findCitiesNearLocation(
    nearLocation: NearLocationRequest,
    namePrefix: string,
    minCityPopulation: number,
    limit: number,
    offset: number): Observable<GeoResponse<CitySummary[]>> {

    let params: HttpParams = this.buildPagingParams(limit, offset);

    params = params
      .set("nearLocation", this.toNearLocationString(nearLocation))
      .set("nearLocationRadius", "" + nearLocation.radius)
      .set("nearLocationRadiusUnit", "MI");

    if (namePrefix) {
      params = params.set("namePrefix", namePrefix);
    }

    if (minCityPopulation) {
      params = params.set("minPopulation", "" + minCityPopulation);
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      this.citiesEndpoint,
      {
        params: params
      }
    );
  }

  findCountries(
    currencyCode: string,
    limit: number,
    offset: number): Observable<GeoResponse<CountrySummary[]>> {

    let params: HttpParams = this.buildPagingParams(limit, offset);

    if (currencyCode) {
      params = params.set("currencyCode", currencyCode);
    }

    return this.httpClient.get<GeoResponse<CountrySummary[]>>(
      this.countriesEndpoint,
      {
        params: params
      }
    );
  }

  findCountryByCode(code: string): Observable<GeoResponse<CountryDetails>> {
    const endpoint = this.countriesEndpoint + "/" + code;

    return this.httpClient.get<GeoResponse<CountryDetails>>(endpoint);
  }

  findCurrencies(
    countryCode: string,
    limit: number,
    offset: number): Observable<GeoResponse<Currency[]>> {

    let params: HttpParams = this.buildPagingParams(limit, offset);

    if (countryCode) {
      params = params.set("countryCode", countryCode);
    }

    return this.httpClient.get<GeoResponse<Currency[]>>(
      this.currenciesEndpoint,
      {
        params: params
      }
    );
  }

  findLocales(
    limit: number,
    offset: number): Observable<GeoResponse<Locale[]>> {

    let params: HttpParams = this.buildPagingParams(limit, offset);

    return this.httpClient.get<GeoResponse<Locale[]>>(
      this.localesEndpoint,
      {
        params: params
      }
    );
  }

  findRegions(
    countryCode: string,
    limit: number,
    offset: number): Observable<GeoResponse<RegionSummary[]>> {

    const endpoint = this.buildRegionsEndpoint(countryCode);

    const params: HttpParams = this.buildPagingParams(limit, offset);

    return this.httpClient.get<GeoResponse<RegionSummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findRegion(countryCode: string, regionCode: string): Observable<GeoResponse<RegionDetails>> {
    const endpoint = this.buildRegionsEndpoint(countryCode) + "/" + regionCode;

    return this.httpClient.get<GeoResponse<RegionDetails>>(endpoint);
  }

  findRegionCities(
    countryCode: string,
    regionCode: string,
    minCityPopulation: number,
    limit: number,
    offset: number): Observable<GeoResponse<CitySummary[]>> {

    const endpoint = this.buildRegionEndpoint(countryCode, regionCode) + "/cities";

    let params: HttpParams = this.buildPagingParams(limit, offset);

    if (minCityPopulation) {
      params = params.set("minPopulation", "" + minCityPopulation);
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  private buildPagingParams(limit: number, offset: number): HttpParams {
    return new HttpParams()
      .set("offset", "" + offset)
      .set("limit", "" + limit);
  }

  private buildRegionEndpoint(countryCode: string, regionCode: string): string {
    return this.buildRegionsEndpoint(countryCode) + "/" + regionCode;
  }

  private buildRegionsEndpoint(countryCode: string): string {
    return this.countriesEndpoint + "/" + countryCode + "/regions";
  }

  private toNearLocationString(nearLocation: NearLocationRequest): string {
    let locationString = "";

    if (nearLocation.latitude > 0) {
      locationString += "+";
    }

    locationString += nearLocation.latitude;

    if (nearLocation.longitude > 0) {
      locationString += "+";
    }

    locationString += nearLocation.longitude;

    return locationString;
  }
}
