import { PhoneTypeEnum } from '../enums/phone-type.enum';
import { IPhone } from '../interfaces/user/phone-interface';
import { IPhoneToDisplay } from '../interfaces/user/phone-to-display.interface';
import { PhoneList } from '../types/phone-list';
import { phoneTypeDescriptionMap } from './phone-type-description-map';

export const preparePhoneList = (
  originalUserPhoneList: PhoneList,
  isDisplayPhone: boolean,
  callback: (phone: IPhoneToDisplay) => void
) => {
  Object.keys(phoneTypeDescriptionMap)
    .map(Number)
    .forEach((phoneType: number) => {
      const phoneFound = originalUserPhoneList?.find(
        (userPhone: IPhone) => userPhone.type === phoneType
      );

      let phoneNumber = '';

      if (isDisplayPhone) {
        phoneNumber = phoneFound ? formatPhoneNumberToDisplay(phoneFound) : '-';
      } else {
        phoneNumber = phoneFound ? formatPhoneNumberToEdit(phoneFound) : '';
      }

      callback({
        type: phoneType,
        typeDescription: PhoneTypeEnum[phoneType as PhoneTypeEnum],
        number: phoneNumber,
      });
    });
};

const formatPhoneNumberToDisplay = (phone: IPhone): string => {
  return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
};

const formatPhoneNumberToEdit = (phone: IPhone): string => {
  return `${phone.internationalCode}${phone.areaCode}${phone.number}`.replace(
    /[+\-]/g,
    ''
  );
};
