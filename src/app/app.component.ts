import {Component, OnInit} from '@angular/core';
import {GeoDbService} from "./modules/geo-db/geodb.service";
import {GeoResponse} from "./modules/geo-db/model/geo-response.model";
import {Region} from "./modules/geo-db/model/region.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  regions: Region[];

  constructor(private geoDbService: GeoDbService) { }

  ngOnInit(): void {
    this.geoDbService.findRegions('US', 51, 0)
      .do(
        (response: GeoResponse<Region[]>) => {
          this.regions = response.data.slice();
        }
      )
      .subscribe();
  }
}
