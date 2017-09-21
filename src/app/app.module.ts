import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {environment} from "../environments/environment";
import {GeoDbModule} from "./modules/geo-db/geodb.module";

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
