import { CitiesList } from '../../types/cities-list';
import { IBaseCountriesResponse } from '../base-countries-response.interfaces';

export interface ICitiesResponse extends IBaseCountriesResponse {
  data: CitiesList;
}
