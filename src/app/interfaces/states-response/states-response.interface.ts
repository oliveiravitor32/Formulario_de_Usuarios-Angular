import { IBaseCountriesResponse } from '../base-countries-response.interfaces';
import { IStatesResponseData } from './states-response-data.interface';

export interface IStatesResponse extends IBaseCountriesResponse {
  data: IStatesResponseData;
}
