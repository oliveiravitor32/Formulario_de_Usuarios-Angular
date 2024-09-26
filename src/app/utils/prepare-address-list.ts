import { AddressTypeEnum } from '../enums/address-type.enum';
import { IAddress } from '../interfaces/user/address-interface';
import { IAddressToDisplay } from '../interfaces/user/address-to-display.interface';
import { AddressList } from '../types/address-list';
import { addressTypeDescriptionMap } from './address-type-description-map';

export const prepareAddressList = (
  originalUserAddressList: AddressList,
  isDisplayAddress: boolean,
  callback: (addressListToDisplay: IAddressToDisplay) => void
) => {
  Object.keys(addressTypeDescriptionMap)
    .map(Number)
    .forEach((addressType: number) => {
      const addressFound = originalUserAddressList?.find(
        (userAddress) => userAddress.type === addressType
      );

      let address = {} as IAddressToDisplay;

      if (isDisplayAddress) {
        address = returnAddressToDisplay(addressFound, addressType);
      } else {
        address = returnAddressToEdit(addressFound, addressType);
      }

      callback(address);
    });
};

const returnAddressToDisplay = (
  address: IAddress | undefined,
  addressType: number
): IAddressToDisplay => {
  if (!address) {
    return {
      typeDescription:
        addressTypeDescriptionMap[addressType as AddressTypeEnum],
      type: addressType as AddressTypeEnum,
      street: '-',
      complement: '-',
      country: '-',
      state: '-',
      city: '-',
    };
  }

  return {
    typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
    ...address,
  };
};

const returnAddressToEdit = (
  address: IAddress | undefined,
  addressType: number
): IAddressToDisplay => {
  if (!address) {
    return {
      typeDescription:
        addressTypeDescriptionMap[addressType as AddressTypeEnum],
      type: addressType as AddressTypeEnum,
      street: '',
      complement: '',
      country: '',
      state: '',
      city: '',
    };
  }

  return {
    typeDescription: addressTypeDescriptionMap[addressType as AddressTypeEnum],
    ...address,
  };
};
