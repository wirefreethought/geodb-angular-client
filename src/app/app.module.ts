import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {GeoDbModule} from "../lib/geo-db/geodb.module";

import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GeoDbModule.forRoot({
      apiKey: environment.service.apiKey,
      serviceUri: environment.service.uri
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
