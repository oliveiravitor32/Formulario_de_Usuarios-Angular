import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICountriesResponse } from '../interfaces/countries-response/countries-response.interface';
import { CountriesList } from '../types/countries-list';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  API_URL = 'https://countriesnow.space/api/v0.1/countries/positions';

  constructor(private readonly _httpClient: HttpClient) {}

  getCountries(): Observable<CountriesList> {
    return this._httpClient.get<ICountriesResponse>(this.API_URL).pipe(
      map((countriesResponse) => {
        return countriesResponse.data;
      })
    );
  }
}
