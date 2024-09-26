import { Pipe, PipeTransform } from '@angular/core';
import { PhoneTypeEnum } from '../enums/phone-type.enum';

@Pipe({
  name: 'phonePlaceholder',
})
export class PhonePlaceholderPipe implements PipeTransform {
  transform(phoneType: number): string {
    const phonePlaceholderMap: { [key in PhoneTypeEnum]: string } = {
      [PhoneTypeEnum.MOBILE]: 'Ex. +55 11 94444-2222',
      [PhoneTypeEnum.RESIDENTIAL]: 'Ex. +55 11 4002-8922',
      [PhoneTypeEnum.EMERGENCY]: 'Ex. +55 11 94444-2222 ou +55 11 4002-8922',
    };
    return phonePlaceholderMap[phoneType as PhoneTypeEnum];
  }
}
