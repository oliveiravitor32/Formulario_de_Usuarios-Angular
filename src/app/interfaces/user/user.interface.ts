import { MaritalStatusEnum } from '../../enums/marital-status.enum';
import { AddressList } from '../../types/address-list';
import { DependentsList } from '../../types/dependents-list';
import { PhonesList } from '../../types/phones-list';

export interface IUser {
  name: string;
  email: string;
  country: string;
  state: string;
  maritalStatus: MaritalStatusEnum;
  monthlyIncome: number;
  birthDate: string;
  phonesList: PhonesList;
  addressList: AddressList;
  dependentsList: DependentsList;
}
