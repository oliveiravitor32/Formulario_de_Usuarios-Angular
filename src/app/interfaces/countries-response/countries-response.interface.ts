import { CountriesList } from '../../types/countries-list';
import { IBaseCountriesResponse } from '../base-countries-response.interfaces';

export interface ICountriesResponse extends IBaseCountriesResponse {
  data: CountriesList;
}
