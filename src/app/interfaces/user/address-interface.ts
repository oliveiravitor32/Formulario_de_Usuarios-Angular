import { AddressTypeEnum } from '../../enums/address-type.enum';

export interface IAddress {
  type: AddressTypeEnum;
  street: string;
  complement: string;
  country: string;
  state: string;
  city: string;
}
