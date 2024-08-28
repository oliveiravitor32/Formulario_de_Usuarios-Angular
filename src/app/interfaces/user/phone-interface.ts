import { PhoneTypeEnum } from '../../enums/phone-type.enum';

export interface IPhone {
  type: PhoneTypeEnum;
  areaCode: string;
  internationalCode: string;
  number: string;
}
