import { Pipe, PipeTransform } from '@angular/core';
import { MaritalStatusEnum } from '../enums/marital-status.enum';

@Pipe({
  name: 'maritalStatus',
})
export class MaritalStatusPipe implements PipeTransform {
  transform(maritalStatus: MaritalStatusEnum | undefined): string {
    const maritalStatusHashMap: { [key: number]: string } = {
      [MaritalStatusEnum.SINGLE]: 'Solteiro',
      [MaritalStatusEnum.MARRIED]: 'Casado',
      [MaritalStatusEnum.DIVORCED]: 'Divorciado',
    };

    return maritalStatus ? maritalStatusHashMap[maritalStatus] : '';
  }
}
