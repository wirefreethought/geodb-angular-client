import {Component, OnInit} from '@angular/core';
import {GeoDbService} from "../lib/geo-db/geodb.service";
import {GeoResponse} from "../lib/geo-db/model/geo-response.model";
import {RegionSummary} from "../lib/geo-db/model/region-summary.model";
import {Locale} from "../lib/geo-db/model/locale.model";
import {Currency} from "../lib/geo-db/model/currency.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currencies: Currency[];
  locales: Locale[];
  regions: RegionSummary[];

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit(): void {
    // Find all currencies.
    this.geoDbService.findCurrencies( {
        limit: 1000,
        offset: 0}
      )
      .subscribe((response: GeoResponse<Currency[]>) => {
        this.currencies = response.data.slice();
    });

    // Find all locales.
    this.geoDbService.findLocales({
        limit: 1000,
        offset: 0
      })
      .subscribe((response: GeoResponse<Locale[]>) => {
        this.locales = response.data.slice();
      });

    // Find all US states.
    this.geoDbService.findRegions({
        countryCode: 'US',
        limit: 50,
        offset: 0
      })
      .subscribe((response: GeoResponse<RegionSummary[]>) => {
        this.regions = response.data.slice();
      });
  }
}
