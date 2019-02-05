import {Observable} from 'rxjs';

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {CityDetails} from './model/city-details.model';
import {CitySummary} from './model/city-summary.model';
import {CountrySummary} from './model/country-summary.model';
import {GeoResponse} from './model/geo-response.model';
import {NearLocationRequest} from './request/near-location-request.model';
import {RegionSummary} from './model/region-summary.model';

import {GeoDbConfig} from './model/geodb-config.model';
import {CountryDetails} from './model/country-details.model';
import {RegionDetails} from './model/region-details.model';
import {Currency} from './model/currency.model';
import {Locale} from './model/locale.model';
import {FindCitiesRequest} from './request/find-cities-request.model';
import {FindCollectionRequest} from './request/find-collection-request.model';
import {FindCountriesRequest} from './request/find-countries-request.model';
import {FindCurrenciesRequest} from './request/find-currencies-request.model';
import {FindRegionsRequest} from './request/find-regions-request.model';
import {FindRegionCitiesRequest} from './request/find-region-cities-request.model';
import {FindCitiesNearCityRequest} from './request/find-cities-near-city-request.model';
import {TimeZone} from './model/time-zone.model';
import {GetCityDistanceRequest} from './request/get-city-distance-request.model';
import {FindCitiesNearLocationRequest} from './request/find-cities-near-location-request.model';
import {GetCityDetailsRequest} from './request/get-city-details-request.model';
import {GetCountryDetailsRequest} from './request/get-country-details-request.model';
import {GetRegionDetailsRequest} from './request/get-region-details-request.model';
import {Language} from './model/language.model';

@Injectable()
export class GeoDbService {
  private citiesEndpoint: string;
  private countriesEndpoint: string;
  private currenciesEndpoint: string;
  private languagesEndpoint: string;
  private localesEndpoint: string;
  private timeZonesEndpoint: string;

  constructor(private httpClient: HttpClient, private config: GeoDbConfig) {

    this.citiesEndpoint = config.serviceUri + '/v1/geo/cities';
    this.countriesEndpoint = config.serviceUri + '/v1/geo/countries';
    this.currenciesEndpoint = config.serviceUri + '/v1/locale/currencies';
    this.languagesEndpoint = config.serviceUri + '/v1/locale/languages';
    this.localesEndpoint = config.serviceUri + '/v1/locale/locales';
    this.timeZonesEndpoint = config.serviceUri + '/v1/locale/timezones';
  }

  private static buildPagingParams(request: FindCollectionRequest): HttpParams {

    return new HttpParams()
      .set('offset', '' + request.offset)
      .set('limit', '' + request.limit)
      .set('hateoasMode', 'false');
  }

  private static toLocationString(nearLocation: NearLocationRequest): string {

    let locationString = '';

    if (nearLocation.latitude > 0) {
      locationString += '+';
    }

    locationString += nearLocation.latitude;

    if (nearLocation.longitude > 0) {
      locationString += '+';
    }

    locationString += nearLocation.longitude;

    return locationString;
  }

  findCity(request: GetCityDetailsRequest): Observable<GeoResponse<CityDetails>> {

    const endpoint = this.buildCityEndpoint(request.cityId);

    let params: HttpParams = new HttpParams();

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<CityDetails>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findCities(request: FindCitiesRequest): Observable<GeoResponse<CitySummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.countryIds) {
      params = params.set('countryCodes', request.countryIds.join(','));
    }

    if (request.excludedCountryIds) {
      params = params.set('excludedCountryCodes', request.excludedCountryIds.join(','));
    }

    if (request.namePrefix) {
      params = params.set('namePrefix', request.namePrefix);
    }

    if (request.minPopulation) {
      params = params.set('minPopulation', '' + request.minPopulation);
    }

    if (request.timeZoneIds) {
      params = params.set('timeZoneIds', request.timeZoneIds.join(','));
    }

    if (request.types) {
      params = params.set('types', request.types.join(','));
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    if (request.sortDirectives) {
      params = params.set('sort', request.sortDirectives.join(','));
    }

    if (request.includeDeleted) {
      params = params.set('includeDeleted', request.includeDeleted);
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      this.citiesEndpoint,
      {
        params: params
      }
    );
  }

  findCitiesNearLocation(request: FindCitiesNearLocationRequest): Observable<GeoResponse<CitySummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    params = params
      .set('radius', '' + request.location.radius)
      .set('distanceUnit', request.location.distanceUnit);

    if (request.minPopulation) {
      params = params.set('minPopulation', '' + request.minPopulation);
    }

    if (request.namePrefix) {
      params = params.set('namePrefix', request.namePrefix);
    }

    if (request.types) {
      params = params.set('types', request.types.join(','));
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    if (request.sortDirectives) {
      params = params.set('sort', request.sortDirectives.join(','));
    }

    if (request.includeDeleted) {
      params = params.set('includeDeleted', request.includeDeleted);
    }

    // Workaround for HttpClient '+' encoding bug.
    const locationId = GeoDbService
      .toLocationString(request.location)
      .replace('+', '%2B');

    const endpoint = this.citiesEndpoint + '?location=' + locationId;

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findCitiesNearCity(request: FindCitiesNearCityRequest): Observable<GeoResponse<CitySummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    params = params
      .set('radius', '' + request.radius)
      .set('distanceUnit', request.distanceUnit);

    if (request.minPopulation) {
      params = params.set('minPopulation', '' + request.minPopulation);
    }

    if (request.types) {
      params = params.set('types', request.types.join(','));
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    if (request.sortDirectives) {
      params = params.set('sort', request.sortDirectives.join(','));
    }

    if (request.includeDeleted) {
      params = params.set('includeDeleted', request.includeDeleted);
    }

    const endpoint = this.citiesEndpoint + '/' + request.cityId + '/nearbyCities';

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findCountries(request: FindCountriesRequest): Observable<GeoResponse<CountrySummary[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.currencyCode) {
      params = params.set('currencyCode', request.currencyCode);
    }

    if (request.namePrefix) {
      params = params.set('namePrefix', request.namePrefix);
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<CountrySummary[]>>(
      this.countriesEndpoint,
      {
        params: params
      }
    );
  }

  findCountry(request: GetCountryDetailsRequest): Observable<GeoResponse<CountryDetails>> {

    const endpoint = this.countriesEndpoint + '/' + request.countryId;

    let params: HttpParams = new HttpParams();

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<CountryDetails>>(
      endpoint,
      {
        params: params
      });
  }

  findCurrencies(request: FindCurrenciesRequest): Observable<GeoResponse<Currency[]>> {

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.countryId) {
      params = params.set('countryId', request.countryId);
    }

    return this.httpClient.get<GeoResponse<Currency[]>>(
      this.currenciesEndpoint,
      {
        params: params
      }
    );
  }

  findLanguages(request: FindCollectionRequest): Observable<GeoResponse<Language[]>> {

    const params: HttpParams = GeoDbService.buildPagingParams(request);

    return this.httpClient.get<GeoResponse<Locale[]>>(
      this.languagesEndpoint,
      {
        params: params
      }
    );
  }

  findLocales(request: FindCollectionRequest): Observable<GeoResponse<Locale[]>> {

    const params: HttpParams = GeoDbService.buildPagingParams(request);

    return this.httpClient.get<GeoResponse<Locale[]>>(
      this.localesEndpoint,
      {
        params: params
      }
    );
  }

  findRegion(request: GetRegionDetailsRequest): Observable<GeoResponse<RegionDetails>> {

    const endpoint = this.buildRegionsEndpoint(request.countryId) + '/' + request.regionCode;

    let params: HttpParams = new HttpParams();

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<RegionDetails>>(
      endpoint,
      {
        params: params
      });
  }

  findRegionCities(request: FindRegionCitiesRequest): Observable<GeoResponse<CitySummary[]>> {

    const endpoint = this.buildRegionEndpoint(request.countryId, request.regionCode) + '/cities';

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.minPopulation) {
      params = params.set('minPopulation', '' + request.minPopulation);
    }

    if (request.types) {
      params = params.set('types', request.types.join(','));
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    if (request.sortDirectives) {
      params = params.set('sort', request.sortDirectives.join(','));
    }

    return this.httpClient.get<GeoResponse<CitySummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findRegions(request: FindRegionsRequest): Observable<GeoResponse<RegionSummary[]>> {

    const endpoint = this.buildRegionsEndpoint(request.countryId);

    let params: HttpParams = GeoDbService.buildPagingParams(request);

    if (request.namePrefix) {
        params = params.set('namePrefix', request.namePrefix);
    }

    if (request.asciiMode) {
      params = params.set('asciiMode', '' + request.asciiMode);
    }

    if (request.languageCode) {
      params = params.set('languageCode', request.languageCode);
    }

    return this.httpClient.get<GeoResponse<RegionSummary[]>>(
      endpoint,
      {
        params: params
      }
    );
  }

  findTimeZones(request: FindCollectionRequest): Observable<GeoResponse<TimeZone[]>> {

    const params: HttpParams = GeoDbService.buildPagingParams(request);

    return this.httpClient.get<GeoResponse<TimeZone[]>>(
      this.timeZonesEndpoint,
      {
        params: params
      }
    );
  }

  get apiKey(): string {
    return this.config.apiKey;
  }

  setApiKey(apiKey: string) {
    this.config.apiKey = apiKey;
  }

  getCityDateTime(id: string): Observable<GeoResponse<string>> {

    const endpoint = this.buildCityEndpoint(id) + '/dateTime';

    return this.httpClient.get<GeoResponse<string>>(endpoint);
  }

  getCityDistance(request: GetCityDistanceRequest): Observable<GeoResponse<number>> {

    const endpoint = this.buildCityEndpoint(request.toCityId) + '/distance';

    const params: HttpParams = new HttpParams()
      .set('fromCityId', '' + request.fromCityId)
      .set('distanceUnit', '' + request.distanceUnit);

    return this.httpClient.get<GeoResponse<number>>(
      endpoint,
      {
        params: params
      }
    );
  }

  getCityTime(cityId: string): Observable<GeoResponse<string>> {

    const endpoint = this.buildCityEndpoint(cityId) + '/time';

    return this.httpClient.get<GeoResponse<string>>(endpoint);
  }

  getTimeZoneDateTime(zoneId: string): Observable<GeoResponse<string>> {

    const endpoint = this.buildTimeZoneEndpoint(zoneId) + '/dateTime';

    return this.httpClient.get<GeoResponse<string>>(endpoint);
  }

  getTimeZoneTime(zoneId: string): Observable<GeoResponse<string>> {

    const endpoint = this.buildTimeZoneEndpoint(zoneId) + '/time';

    return this.httpClient.get<GeoResponse<string>>(endpoint);
  }

  private buildCityEndpoint(cityId: string): string {
    return this.citiesEndpoint + '/' + cityId;
  }

  private buildRegionEndpoint(countryId: string, regionCode: string): string {
    return this.buildRegionsEndpoint(countryId) + '/' + regionCode;
  }

  private buildRegionsEndpoint(countryId: string): string {
    return this.countriesEndpoint + '/' + countryId + '/regions';
  }

  private buildTimeZoneEndpoint(zoneId: string): string {
    return this.timeZonesEndpoint + '/' + zoneId;
  }
}
