# GeoDB Angular Client

This library provides Angular client bindings to the [GeoDB](https://rapidapi.com/user/wirefreethought/package/GeoDB) service.

## Setup

1. Create an account on [RapidAPI](https://rapidapi.com). As part of account creation, Rapid asks for credit-card info. As long as you stay within the free usage limits of the Basic plan, your credit card will not be charged.
2. [Select](https://rapidapi.com/user/wirefreethought/package/GeoDB/pricing) a GeoDB plan.
3. ``cd`` into your Angular project root.
4. ``npm install wft-geodb-angular-client --save``
5. Update your ``AppModule.ts`` as follows:
    ```
    @NgModule({
      declarations: [
        ...
      ],
      imports: [
        ...
        GeoDbModule.forRoot({
          apiKey: YOUR_MASHAPE_KEY,
          serviceUri: https://wft-geo-db.p.mashape.com
        })
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```
6. In your Typescript class:

``constructor(private geoDbService: GeoDbService) { }``

## Usage

Find all cities starting with 'Los' in the United States with a minimum population of 100,000 (first 10 results):
```
this.geoDbService.findCities("Los", "US", 100000, 10, 0)
  .subscribe(
    (response: GeoResponse<CitySummary[]>) => {
      const totalCount = response.metadata.totalCount;
      let data: CitySummary[] = response.data;
      
      // Do your thing!
    }
   );
```

See the [sample app](https://github.com/wirefreethought/geo-db-sample-angular-app) for more detailed examples.
