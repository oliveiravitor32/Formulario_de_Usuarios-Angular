import { IUserFormAddress } from './address.interface';
import { IUserFormPhone } from './phone.interface';

export interface IUserFormContactInformations {
  phoneList: IUserFormPhone[];
  addressList: IUserFormAddress[];
}
