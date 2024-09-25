import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IPhoneToDisplay } from '../../../interfaces/user/phone-to-display.interface';
import { PhoneList } from '../../../types/phone-list';
import { preparePhoneList } from '../../../utils/prepare-phone-list';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.scss',
})
export class PhoneListComponent implements OnChanges {
  @Input({ required: true }) userPhoneList: PhoneList | undefined = [];

  phoneListToDisplay: IPhoneToDisplay[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const PHONE_LIST_LOAD = Array.isArray(
      changes['userPhoneList']?.currentValue
    );

    if (PHONE_LIST_LOAD) {
      this.preparePhoneListToDisplay();
    }
  }

  preparePhoneListToDisplay() {
    this.phoneListToDisplay = [];

    const originalUserPhoneList: PhoneList =
      this.userPhoneList && this.userPhoneList.length > 0
        ? this.userPhoneList
        : [];

    preparePhoneList(originalUserPhoneList, true, (phone) =>
      this.phoneListToDisplay.push(phone)
    );
  }
}
