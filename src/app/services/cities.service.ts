import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICitiesResponse } from '../interfaces/cities-response/cities-response.interface';
import { CitiesList } from '../types/cities-list';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  API_URL = 'https://countriesnow.space/api/v0.1/countries/state/cities';

  constructor(private readonly _httpClient: HttpClient) {}

  getCities(countryName: string, stateName: string): Observable<CitiesList> {
    return this._httpClient
      .post<ICitiesResponse>(this.API_URL, {
        country: countryName,
        state: stateName,
      })
      .pipe(map((citiesResponse) => citiesResponse.data));
  }
}
