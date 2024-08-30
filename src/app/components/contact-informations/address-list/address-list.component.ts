import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressTypeEnum } from '../../../enums/address-type.enum';
import { IAddress } from '../../../interfaces/user/address-interface';
import { IAddressToDisplay } from '../../../interfaces/user/address-to-display.interface';
import { AddressList } from '../../../types/address-list';
import { addressTypeDescriptionMap } from '../../../utils/address-type-description-map';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.scss',
})
export class AddressListComponent implements OnChanges {
  @Input({ required: true }) userAddressList: AddressList | undefined = [];

  addressListToDisplay: IAddressToDisplay[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const ADDRESS_LIST_LOADED = Array.isArray(
      changes['userAddressList'].currentValue
    );

    if (ADDRESS_LIST_LOADED) {
      this.prepareAddressListToDisplay();
    }
  }

  prepareAddressListToDisplay() {
    Object.keys(addressTypeDescriptionMap)
      .map(Number)
      .forEach((addressType: number) => {
        const addressFound = this.userAddressList?.find(
          (userAddress) => userAddress.type === addressType
        );

        this.addressListToDisplay.push(
          this.returnAddressToDisplay(addressFound, addressType)
        );
      });
  }

  returnAddressToDisplay(
    address: IAddress | undefined,
    addressType: number
  ): IAddressToDisplay {
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
      typeDescription:
        addressTypeDescriptionMap[addressType as AddressTypeEnum],
      ...address,
    };
  }
}
