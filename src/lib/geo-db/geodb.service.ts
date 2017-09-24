import {Observable} from "rxjs/Observable";
import "rxjs/Rx";

import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {CityDetails} from "./model/city-details.model";
import {CitySummary} from "./model/city-summary.model";
import {CountrySummary} from "./model/country-summary.model";
import {GeoResponse} from "./model/geo-response.model";
import {NearLocationRequest} from "./model/request/near-location-request.model";
import {RegionSummary} from "./model/region-summary.model";

import {GeoDbConfig} from "./model/geodb-config.model";
import {CountryDetails} from "./model/country-details.model";
import {RegionDetails} from "./model/region-details.model";
import {Currency} from "./model/currency.model";
import {Locale} from "./model/locale.model";
import {FindCitiesRequest} from "./model/request/find-cities-request.model";
import {FindCollectionRequest} from "./model/request/find-collection-request.model";
import {FindCountriesRequest} from "./model/request/find-countries-request.model";
import {FindCurrenciesRequest} from "./model/request/find-currencies-request.model";
import {FindRegionsRequest} from "./model/request/find-regions-request.model";
import {FindRegionCitiesRequest} from "./model/request/find-region-cities-request.model";
import {IncludeDeletedMode} from "./model/include-deleted-mode.enum";
import {LengthUnit} from "./model/length-unit.enum";

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

  private static buildPagingParams(request: FindCollectionRequest): HttpParams {
    return new HttpParams()
      .set("offset", "" + request.offset)
      .set("limit", "" + request.limit);
  }

  private static toNearLocationString(nearLocation: NearLocationRequest): string {
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

  findCityById(id: number): Observable<GeoResponse<CityDetails>> {
    const endpoint = this.citiesEndpoint + "/" + id;

    return this.httpClient.get<GeoResponse<CityDetails>>(endpoint);
  }

  findCities(request: FindCitiesRequest): Observable<GeoResponse<CitySummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.namePrefix) {
      params = params.set("namePrefix", request.namePrefix);
    }

    if (request.countryCode) {
      params = params.set("countryCode", request.countryCode);
    }

    if (request.minPopulation) {
      params = params.set("minPopulation", "" + request.minPopulation);
    }

    if (request.includeDeleted) {
      params = params.set("includeDeleted", IncludeDeletedMode[request.includeDeleted]);
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      this.citiesEndpoint,
      {
        params: params
      }
    );
  }

  findCitiesNearLocation(request: FindCitiesRequest): Observable<GeoResponse<CitySummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    params = params
      .set("nearLocation", GeoDbService.toNearLocationString(request.nearLocation))
      .set("nearLocationRadius", "" + request.nearLocation.radius)
      .set("nearLocationRadiusUnit", LengthUnit[request.nearLocation.radiusUnit]);

    if (request.namePrefix) {
      params = params.set("namePrefix", request.namePrefix);
    }

    if (request.minPopulation) {
      params = params.set("minPopulation", "" + request.minPopulation);
    }

    if (request.includeDeleted) {
      params = params.set("includeDeleted", IncludeDeletedMode[request.includeDeleted]);
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      this.citiesEndpoint,
      {
        params: params
      }
    );
  }

  findCountries(request: FindCountriesRequest): Observable<GeoResponse<CountrySummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.currencyCode) {
      params = params.set("currencyCode", request.currencyCode);
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

  findCurrencies(request: FindCurrenciesRequest): Observable<GeoResponse<Currency[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.countryCode) {
      params = params.set("countryCode", request.countryCode);
    }

    return this.httpClient.get<GeoResponse<Currency[]>>(
      this.currenciesEndpoint,
      {
        params: params
      }
    );
  }

  findLocales(request: FindCollectionRequest): Observable<GeoResponse<Locale[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    return this.httpClient.get<GeoResponse<Locale[]>>(
      this.localesEndpoint,
      {
        params: params
      }
    );
  }

  findRegions(request: FindRegionsRequest): Observable<GeoResponse<RegionSummary[]>> {

    const endpoint = this.buildRegionsEndpoint(request.countryCode);

    const params: HttpParams = GeoDbService.buildPagingParams(request);

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

  findRegionCities(request: FindRegionCitiesRequest): Observable<GeoResponse<CitySummary[]>> {

    const endpoint = this.buildRegionEndpoint(request.countryCode, request.regionCode) + "/cities";

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.minPopulation) {
      params = params.set("minPopulation", "" + request.minPopulation);
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  private buildRegionEndpoint(countryCode: string, regionCode: string): string {
    return this.buildRegionsEndpoint(countryCode) + "/" + regionCode;
  }

  private buildRegionsEndpoint(countryCode: string): string {
    return this.countriesEndpoint + "/" + countryCode + "/regions";
  }
}
