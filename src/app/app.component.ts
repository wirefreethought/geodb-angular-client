import {Component, OnInit} from '@angular/core';
import {Currency} from '../../projects/wft-geodb-angular-client/src/lib/model/currency.model';
import {Locale} from '../../projects/wft-geodb-angular-client/src/lib/model/locale.model';
import {RegionSummary} from '../../projects/wft-geodb-angular-client/src/lib/model/region-summary.model';
import {TimeZone} from '../../projects/wft-geodb-angular-client/src/lib/model/time-zone.model';
import {GeoDbService} from '../../projects/wft-geodb-angular-client/src/lib/geodb.service';
import {GeoResponse} from '../../projects/wft-geodb-angular-client/src/lib/model/geo-response.model';
import {Language} from '../../projects/wft-geodb-angular-client/src/lib/model/language.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currencies: Currency[];
  languages: Language[];
  locales: Locale[];
  regions: RegionSummary[];
  timeZones: TimeZone[];

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit(): void {
    // Find all currencies.
    this.geoDbService.findCurrencies( {
        limit: 10,
        offset: 0}
      )
      .subscribe((response: GeoResponse<Currency[]>) => {
        this.currencies = response.data.slice();
    });

    // Find all languages.
    this.geoDbService.findLanguages({
      limit: 10,
      offset: 0
    })
      .subscribe((response: GeoResponse<Language[]>) => {
        this.languages = response.data.slice();
      });

    // Find all locales.
    this.geoDbService.findLocales({
        limit: 10,
        offset: 0
      })
      .subscribe((response: GeoResponse<Locale[]>) => {
        this.locales = response.data.slice();
      });

    // Find all US states.
    this.geoDbService.findRegions({
        countryId: 'US',
        limit: 10,
        offset: 0
      })
      .subscribe((response: GeoResponse<RegionSummary[]>) => {
        this.regions = response.data.slice();
      });

    // Find all time zones.
    this.geoDbService.findTimeZones({
      limit: 10,
      offset: 0
    })
      .subscribe((response: GeoResponse<TimeZone[]>) => {
        this.timeZones = response.data.slice();
      });
  }
}
