import { IUserFormAddress } from '../interfaces/user-form/address.interface';
import { IUserFormDependent } from '../interfaces/user-form/dependent.interface';
import { IUserFormGeneralInformations } from '../interfaces/user-form/general-informations.interface';
import { IUserFormPhone } from '../interfaces/user-form/phone.interface';
import { IUserForm } from '../interfaces/user-form/user-form.interface';
import { IUser } from '../interfaces/user/user.interface';
import { AddressList } from '../types/address-list';
import { DependentsList } from '../types/dependents-list';
import { PhoneList } from '../types/phone-list';
import { convertDateObjToPtBrDate } from './convert-obj-date-to-pt-br-date';
import { formatNumber } from './format-number';

export const convertUserFormToUser = (userForm: IUserForm): IUser => {
  let newUser: Partial<IUser> = {} as IUser;

  newUser = { ...convertGeneralInformations(userForm.generalInformations) };
  newUser.phonesList = [
    ...convertPhoneList(userForm.contactInformations.phoneList),
  ];
  newUser.addressList = [
    ...convertAddressList(userForm.contactInformations.addressList),
  ];
  newUser.dependentsList = [...convertDependentsList(userForm.dependentsList)];

  return newUser as IUser;
};

const convertGeneralInformations = (
  generalInformations: IUserFormGeneralInformations
): Partial<IUser> => {
  return {
    name: generalInformations.name,
    email: generalInformations.email,
    country: generalInformations.country,
    state: generalInformations.state,
    maritalStatus: generalInformations.maritalStatus,
    monthlyIncome: generalInformations.monthlyIncome,
    birthDate: convertDateObjToPtBrDate(generalInformations.birthDate),
  };
};

const convertPhoneList = (phoneList: IUserFormPhone[]): PhoneList => {
  const newUserPhoneList: PhoneList = phoneList
    .map((phone) => ({
      type: phone.type,
      internationalCode: '+' + phone.number.substring(0, 2),
      areaCode: phone.number.substring(2, 4),
      number: formatNumber(phone.number.substring(4)),
    }))
    .filter((phone) => phone.areaCode !== '');

  return newUserPhoneList;
};

const convertAddressList = (addressList: IUserFormAddress[]): AddressList => {
  const newUserAddressList: AddressList = addressList
    .map((address) => ({
      type: address.type,
      country: address.country,
      state: address.state,
      city: address.city,
      street: address.street,
      complement: address.complement,
    }))
    .filter((address) => address.street !== '');
  return newUserAddressList;
};

const convertDependentsList = (
  dependentsList: IUserFormDependent[]
): DependentsList => {
  const newUserDependentsList: DependentsList = dependentsList.map(
    (dependent) => ({
      name: dependent.name,
      age: parseInt(dependent.age),
      document: parseInt(dependent.document),
    })
  );

  return newUserDependentsList;
};
