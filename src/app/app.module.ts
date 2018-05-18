import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GeoDbProModule} from '../../projects/wft-geodb-angular-client/src/lib/geodb/geodb-pro.module';

import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GeoDbProModule.forRoot({
      apiKey: environment.service.apiKey,
      serviceUri: environment.service.uri
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
