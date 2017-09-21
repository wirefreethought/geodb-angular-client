import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {ModuleWithProviders, NgModule} from "@angular/core";

import {AuthInterceptor} from "./auth.interceptor";
import {GeoDbService} from "./geodb.service";
import {GeoDbConfig} from "./model/geodb-config.model";

@NgModule({
  providers: [
    GeoDbService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  imports: [
    HttpClientModule
  ]
})
export class GeoDbModule {
  static forRoot(config: GeoDbConfig): ModuleWithProviders {
    return {
      ngModule: GeoDbModule,
      providers: [
        {provide: GeoDbConfig, useValue: config}
      ]
    };
  }

  constructor(config: GeoDbConfig) {
  }
}
