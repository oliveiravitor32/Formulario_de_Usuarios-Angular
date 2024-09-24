import { MaritalStatusEnum } from '../../enums/marital-status.enum';
import { AddressList } from '../../types/address-list';
import { DependentsList } from '../../types/dependents-list';
import { PhoneList } from '../../types/phone-list';

export interface IUser {
  name: string;
  email: string;
  country: string;
  state: string;
  maritalStatus: MaritalStatusEnum;
  monthlyIncome: number;
  birthDate: string;
  phonesList: PhoneList;
  addressList: AddressList;
  dependentsList: DependentsList;
}
