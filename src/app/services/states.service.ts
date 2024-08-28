import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IStatesResponse } from '../interfaces/states-response/states-response.interface';
import { StatesList } from '../types/states-list';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  API_URL = 'https://countriesnow.space/api/v0.1/countries/states';
  constructor(private readonly _httpClient: HttpClient) {}

  getStates(countryName: string): Observable<StatesList> {
    return this._httpClient
      .post<IStatesResponse>(this.API_URL, {
        country: countryName,
      })
      .pipe(
        map((statesResponse: IStatesResponse) => statesResponse.data.states)
      );
  }
}
