import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PhoneTypeEnum } from '../../../enums/phone-type.enum';
import { IPhone } from '../../../interfaces/user/phone-interface';
import { IPhoneToDisplay } from '../../../interfaces/user/phone-to-display.interface';
import { PhonesList } from '../../../types/phones-list';
import { phoneTypeDescriptionMap } from '../../../utils/phone-type-description-map';

@Component({
  selector: 'app-phones-list',
  templateUrl: './phones-list.component.html',
  styleUrl: './phones-list.component.scss',
})
export class PhonesListComponent implements OnChanges {
  @Input({ required: true }) userPhonesList: PhonesList | undefined = [];

  phonesListToDisplay: IPhoneToDisplay[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const PHONE_LIST_LOAD = Array.isArray(
      changes['userPhonesList'].currentValue
    );

    if (PHONE_LIST_LOAD) {
      this.preparePhoneListToDisplay();
    }
  }

  preparePhoneListToDisplay() {
    this.phonesListToDisplay = [];

    Object.keys(phoneTypeDescriptionMap)
      .map(Number)
      .forEach((phoneType: number) => {
        const phoneFound = this.userPhonesList?.find(
          (userPhone: IPhone) => userPhone.type === phoneType
        );

        this.phonesListToDisplay.push({
          type: phoneTypeDescriptionMap[phoneType as PhoneTypeEnum],
          number: phoneFound ? this.formatPhoneNumber(phoneFound) : '-',
        });
      });
  }

  formatPhoneNumber(phone: IPhone): string {
    return `${phone.internationalCode} ${phone.areaCode} ${phone.number}`;
  }
}
