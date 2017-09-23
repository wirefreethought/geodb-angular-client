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
    this.geoDbService.findCurrencies(null, 1000, 0)
      .subscribe((response: GeoResponse<Currency[]>) => {
        this.currencies = response.data.slice();
    });

    this.geoDbService.findLocales(1000, 0)
      .subscribe((response: GeoResponse<Locale[]>) => {
        this.locales = response.data.slice();
      });

    this.geoDbService.findRegions('US', 51, 0)
      .subscribe((response: GeoResponse<RegionSummary[]>) => {
        this.regions = response.data.slice();
      });
  }
}
